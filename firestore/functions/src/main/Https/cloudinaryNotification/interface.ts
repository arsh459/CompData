export interface EagerNotificationResponse {
  notification_type: 'eager';
  state?: 'failed';
  eager: Eager[];
  batch_id: string;
  asset_id: string;
  public_id: string;
}

interface Eager {
  crop: string;
  width: number;
  height: number;
  bytes: number;

  url: string;
  secure_url: string;
}
