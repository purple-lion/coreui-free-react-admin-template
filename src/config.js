export default {
  clientId: 'proxy-client',
  clientSecret: 'd60227dc-ac65-4f6c-88fd-42fb76530858',
  defaultScope: 'openid email profile',
  API_BASE: window.RUNTIME_API_BASE
    ? window.RUNTIME_API_BASE
    : 'https://backoffice-dev.kong.yk8s.me',
// : 'https://backoffice-local.kong.yk8s.me',
  AUTH_BASE: window.RUNTIME_AUTH_BASE
    ? window.RUNTIME_AUTH_BASE
    : 'https://keycloak.kong.yk8s.me/auth/realms/tarangire-dev/protocol/openid-connect',
  TOKEN_URL: window.RUNTIME_TOKEN_URL
    ? window.RUNTIME_TOKEN_URL
    : 'https://keycloak.kong.yk8s.me/auth/realms/tarangire-dev/protocol/openid-connect/token',
  USERINFO_URL: window.RUNTIME_TOKEN_URL
    ? window.RUNTIME_TOKEN_URL
    : 'https://keycloak.kong.yk8s.me/auth/realms/tarangire-dev/protocol/openid-connect/userinfo',
};
