

import { Eyes, Target } from '@applitools/eyes-testcafe';


fixture`Login Test`
  .page`http://localhost:8100/login`;

test('Visual Test - Login Page', async (t) => {
  const eyes = new Eyes();
  await eyes.open({
    t,
    appName: 'SGI',
    testName: 'Login Page Visual Test',
  });

  await eyes.check('Página de inicio de sesión', Target.window());

  await eyes.close();
});
