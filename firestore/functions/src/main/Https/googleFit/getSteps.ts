import axios from "axios";

export interface dataSourceResponse {
  dataSource: DataSource[];
}

interface DataSource {
  dataStreamId?: string;
  dataStreamName?: string;
  type?: string;
  dataType?: FitDataType;
  device?: FitDevice;
  application?: FitApplication;
  dataQualityStandard?: unknown[];
}

export interface FitFieldType {
  name?: string;
  format?: string;
}

export interface FitDataType {
  name?: string;
  field?: FitFieldType[];
}

export interface FitDevice {
  uid?: string;
  type?: string;
  version?: string;
  model?: string;
  manufacturer?: string;
}

export interface FitApplication {
  packageName?: string;
}

export const getDataSources = async (accessToken: string) => {
  const dataSourceResponseCall = await axios({
    url: "https://www.googleapis.com/fitness/v1/users/me/dataSources",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resp = dataSourceResponseCall.data as dataSourceResponse;

  return resp;
};

export interface StepAggregateResponse {
  bucket: FitBucket[];
}

export interface FitBucket {
  startTimeMillis: string;
  endTimeMillis: string;
  dataset: FitDataSet[];
}

export interface FitDataSet {
  dataSourceId: string;
  point: FitDataPoint[];
}

export interface FitDataPoint {
  startTimeNanos: string;
  endTimeNanos: string;
  dataTypeName: string;
  originDataSourceId: string;
  value: FitValue[];
  modifiedTimeMillis?: string;
}

export interface FitValue {
  intVal: number;
  mapVal: unknown[];
}

export const getSteps = async (
  accessToken: string,
  start: number,
  end: number,
) => {
  // console.log("getting steps", accessToken, end - start);
  const sData = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    startTimeMillis: start,
    endTimeMillis: end,
  });

  // console.log("sData", sData);

  const response = await axios({
    method: "post",
    url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: sData,
  });

  // console.log("response", response.data);

  return response.data as StepAggregateResponse;
};

export const parseStepResponse = (response: StepAggregateResponse) => {
  let values: number = 0;
  if (response.bucket) {
    for (const bucket of response.bucket) {
      // console.log("bucket", bucket);
      if (bucket.dataset) {
        // console.log("dataset", bucket.dataset);
        for (const dataSet of bucket.dataset) {
          // console.log("dataSet", dataSet);
          if (dataSet.point) {
            // console.log("dataSet.point", dataSet.point);
            for (const pt of dataSet.point) {
              // console.log("pt", pt);
              if (pt.value) {
                // console.log("pt.value", pt.value);
                for (const val of pt.value) {
                  // console.log("val", val, typeof val, Object.keys(val));
                  if (val.intVal) {
                    // console.log("val.intVal", val.intVal);
                    values += val.intVal;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return values;
};

export const getStepsFromDataSources = async (
  accessToken: string,
  start: number,
  end: number,
) => {
  const dataSetResp = await getDataSet(
    accessToken,
    start,
    end,
    "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
  );

  return parseDataSetResponse(dataSetResp.point);
};

interface FitDataSetResponse {
  minStartTimeNs: string;
  maxEndTimeNs: string;
  dataSourceId: string;
  point: FitDataPoint[];
}

const getDataSet = async (
  accessToken: string,
  start: number,
  end: number,
  dS: string,
) => {
  const response = await axios({
    method: "get",
    url: `https://www.googleapis.com/fitness/v1/users/me/dataSources/${dS}/datasets/${
      start * 1000000
    }-${end * 1000000}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resp = response.data as FitDataSetResponse;

  return resp;
};

const parseDataSetResponse = (points: FitDataPoint[]) => {
  let value: number = 0;
  for (const pt of points) {
    // console.log(
    //   "pt",
    //   pt.originDataSourceId,
    //   pt.startTimeNanos ? new Date(parseInt(pt.startTimeNanos) / 1000000) : -1,
    //   pt.endTimeNanos ? new Date(parseInt(pt.endTimeNanos) / 1000000) : -1,
    //   pt.value,
    // );
    if (pt.originDataSourceId && pt.originDataSourceId.includes("user_input")) {
      console.log("purged", pt.value.length);
    } else {
      if (pt.value) {
        for (const val of pt.value) {
          if (val.intVal) {
            value += val.intVal;
          }
        }
      }
    }
  }

  return value;
};
