type ApiMessage = {
  text: string;
  status: boolean;
};

export default function getApiMessage(response: {
  data?: { message?: string };
  status: number;
}): ApiMessage | false {
  const message = response.data?.message;
  if (!message) return false;

  return {
    text: Array.isArray(message) ? message[0] : message,
    status: response.status === 200,
  };
}
