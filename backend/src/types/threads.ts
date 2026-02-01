export interface Thread {
  id: string;
  content: string;
  createdAt: Date;
}
export type ThreadItemPayload = {
  confessionId: string;
  content: string;
};
