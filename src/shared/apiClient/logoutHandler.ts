let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

export const runLogoutHandler = () => {
  logoutHandler?.();
};
