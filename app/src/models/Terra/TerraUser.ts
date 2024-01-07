export interface TerraUser {
  last_webhook_update: string | null;
  provider: TerraPrividers;
  user_id: string;
}

export type TerraPrividers =
  | "TRAININGPEAKS"
  | "FITBIT"
  | "WAHOO"
  | "OURA"
  | "WITHINGS"
  | "GARMIN"
  | "POLAR"
  | "EIGHT"
  | "GOOGLE"
  | "PELOTON"
  | "APPLE"
  | "FREESTYLELIBRE"
  | "SUUNTO"
  | "ZWIFT";

interface OxygenSaturationSample {
  percentage: number | null;
  timestamp: string | null;
}

interface PowerSample {
  timer_duration_seconds: number | null;
  timestamp: string | null;
  watts: number | null;
}

interface METSample {
  level: number | null;
  timestamp: string | null;
}

interface HRVSample {
  hrv: number | null;
  timestamp: string | null;
}

interface HRSample {
  timestamp: string | null;
  bpm: number | null;
}

interface ActivityLevelSample {
  activity_level: ActivityLevel | null;
  timestamp: string | null;
}

interface CadenceSample {
  timer_duration_seconds: number | null;
  timestamp: string | null;
  cadence: number | null;
}

interface ElevationSample {
  timer_duration_seconds: number | null;
  elev_metres: number | null;
  timestamp: string | null;
}

interface DistanceSample {
  distance_metres: number | null;
  timer_duration_seconds: number | null;
  timestamp: string | null;
}

interface PositionSample {
  timer_duration_seconds: number | null;
  coords_lat_lng: [number, number] | null;
  timestamp: string | null;
}

interface TSSSample {
  intensity_factor_planned: number | null;
  intensity_factor_actual: number | null;
  method: string | null;
  planned: number | null;
  actual: number | null;
  normalized_power_watts: number | null;
}

type ActivityType = number | null;
type UploadType = 0 | 1 | 2 | null;

type ActivityLevel = 0 | 1 | 2 | 3 | 4 | 5 | null;

export interface FirestoreTerra {
  metadata: {
    city: string | null;
    type: ActivityType | null;
    end_time: string | null;
    start_time: string | null;
    country: string | null;
    name: string | null;
    summary_id: string | null;
    upload_type: UploadType | null;
    state: string | null;
  };
  device_data: {
    software_version: string | null;
    manufacturer: string | null;
    serial_number: string | null;
    name: string | null;
    hardware_version: string | null;
  };
  calories_data: {
    net_intake_calories: number | null;
    net_activity_calories: number | null;
    BMR_calories: number | null;
    total_burned_calories: number | null;
  };
  createdOnUnix: number;
}

export interface TerraActivity {
  oxygen_data: {
    saturation_percentage: number | null;
    max_volume_ml_per_min_per_kg: number | null;
    saturation_samples: Array<OxygenSaturationSample> | null;
  };
  energy_data: {
    energy_kilojoules: number | null;
    energy_planned_kilojoules: number | null;
  };
  strain_data: {
    strain_level: number | null;
  };
  power_data: {
    avg_watts: number | null;
    power_samples: Array<PowerSample> | null;
    max_watts: number | null;
  };
  MET_data: {
    num_moderate_intensity_minutes: number | null;
    num_low_intensity_minutes: number | null;
    avg_level: number | null;
    samples: Array<METSample> | null;
    num_high_intensity_minutes: number | null;
    num_inactive_minutes: number | null;
  };
  polyline_map_data: {
    summary_polyline: string | null;
  };
  heart_rate_data: {
    summary: {
      user_hr_max: number | null;
      min_hr: number | null;
      avg_hr_variability: number | null;
      avg_hr: number | null;
      resting_hr: number | null;
      max_hr: number | null;
    };
    detailed: {
      hrv_samples: Array<HRVSample> | null;
      hr_samples: Array<HRSample> | null;
    };
  };
  active_durations_data: {
    activity_seconds: number | null;
    low_intensity_seconds: number | null;
    rest_seconds: number | null;
    num_continuous_inactive_periods: number | null;
    inactivity_seconds: number | null;
    activity_levels_samples: Array<ActivityLevelSample> | null;
    moderate_intensity_seconds: number | null;
    vigorous_intensity_seconds: number | null;
  };
  movement_data: {
    normalized_speed_metres_per_second: number | null;
    avg_torque_newton_metres: number | null;
    avg_pace_minutes_per_kilometre: number | null;
    max_pace_minutes_per_kilometre: number | null;
    max_speed_metres_per_second: number | null;
    avg_cadence: number | null;
    max_cadence: number | null;
    avg_velocity_metres_per_second: number | null;
    max_torque_newton_metres: number | null;
    avg_speed_metres_per_second: number | null;
    max_velocity_metres_per_second: number | null;
    cadence_samples: Array<CadenceSample> | null;
  };
  metadata: {
    city: string | null;
    type: ActivityType | null;
    end_time: string | null;
    start_time: string | null;
    country: string | null;
    name: string | null;
    summary_id: string | null;
    upload_type: UploadType | null;
    state: string | null;
  };
  TSS_data: {
    samples: Array<TSSSample> | null;
  };
  device_data: {
    software_version: string | null;
    manufacturer: string | null;
    serial_number: string | null;
    name: string | null;
    hardware_version: string | null;
  };
  work_data: {
    work_in_kilojoules: number | null;
  };
  distance_data: {
    summary: {
      floors_climbed: number | null;
      swimming: {
        pool_length_metres: number | null;
        num_laps: number | null;
        num_strokes: number | null;
      };
      elevation: {
        gain_actual_metres: number | null;
        avg_metres: number | null;
        loss_actual_metres: number | null;
        max_metres: number | null;
        gain_planned_metres: number | null;
        min_metres: number | null;
      };
      distance_metres: number | null;
      steps: number | null;
    };
    detailed: {
      elevation_samples: Array<ElevationSample> | null;
      distance_samples: Array<DistanceSample> | null;
    };
  };
  calories_data: {
    net_intake_calories: number | null;
    net_activity_calories: number | null;
    BMR_calories: number | null;
    total_burned_calories: number | null;
  };
  position_data: {
    start_pos_lat_lng: [] | [number, number];
    position_samples: Array<PositionSample> | null;
    centre_pos_lat_lng: [] | [number, number];
    end_pos_lat_lng: [] | [number, number];
  };
}

export interface FirestoreTerra {
  metadata: {
    city: string | null;
    type: ActivityType | null;
    end_time: string | null;
    start_time: string | null;
    country: string | null;
    name: string | null;
    summary_id: string | null;
    upload_type: UploadType | null;
    state: string | null;
  };
  device_data: {
    software_version: string | null;
    manufacturer: string | null;
    serial_number: string | null;
    name: string | null;
    hardware_version: string | null;
  };
  calories_data: {
    net_intake_calories: number | null;
    net_activity_calories: number | null;
    BMR_calories: number | null;
    total_burned_calories: number | null;
  };
  createdOnUnix: number;
}

export interface SavedTerraActivity extends TerraActivity {
  updatedOnUnix: number;
}
