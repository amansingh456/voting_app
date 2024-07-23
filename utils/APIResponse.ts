const APIResponse = {
  success: (data: object | [object], message: string) => ({
    success: true,
    error: false,
    message,
    data,
    errors: [],
  }),
  error: (message: string, errors: object | [object] = []) => ({
    success: false,
    error: true,
    message,
    data: [],
    errors,
  }),
};

export default APIResponse;
