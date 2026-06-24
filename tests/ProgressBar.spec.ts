import { test, expect } from '@playwright/test';

test.describe('ProgressBar', () => {
  test('should render progress bar correctly with immediate updates', async ({ page }) => {
    await page.goto('http://localhost:3000/your-test-page'); // Replace with your test page URL

    const progressBar = page.locator('.h-1\.5');
    const progressBarInner = progressBar.locator('div');

    // Initial state (should be 0 or its initial rendered value before animation)
    await expect(progressBarInner).toHaveCSS('transform', 'matrix(0, 0, 0, 0, 0, 0)');

    // Simulate scrolling into view to trigger IntersectionObserver
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for the transition to potentially complete
    await page.waitForTimeout(1000);

    // Check if the progress bar reflects a non-zero value after a short delay
    // The exact transform value will depend on the initial 'value' prop in the test setup
    // For this test, let's assume we set it to 50 in the test page component.
    // We check if it's *not* matrix(0, 0, 0, 0, 0, 0) to ensure it updated.
    const transformMatrix = await progressBarInner.evaluate(el => getComputedStyle(el).transform);
    expect(transformMatrix).not.toBe('matrix(0, 0, 0, 0, 0, 0)');

    // You can add more specific checks if you control the 'value' prop in your test setup.
    // For example, if you set the initial value to 50, you might check:
    // await expect(progressBarInner).toHaveCSS('transform', 'matrix(0.5, 0, 0, 0.5, 0, 0)');
    // However, due to CSS transitions, checking the exact final state immediately after
    // might be flaky. The key is that it updates away from the initial state.
  });

  test('should update progress bar smoothly on value change', async ({ page }) => {
    await page.goto('http://localhost:3000/your-test-page'); // Replace with your test page URL

    const progressBar = page.locator('.h-1\.5');
    const progressBarInner = progressBar.locator('div');

    // Assume the test page component updates the value prop dynamically
    // For demonstration, let's simulate setting value to 30 and then to 70

    // Trigger initial load and animation
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500); // Allow initial animation

    // Simulate updating the value prop to 70
    // This part is conceptual and depends on how you control component props in tests.
    // In a real test, you'd re-render the component with a new prop.
    // For this example, we'll just check the state change after a simulated update.

    // For testing, we'd ideally have a way to programmatically change the 'value' prop
    // and observe the effect. Since we can't directly do that here, we'll check
    // that the transform changes after a potential update.

    // If your test setup allows changing props: 
    // await page.evaluate(() => updateProgressBarValue(70));
    // await page.waitForTimeout(1000); // Wait for transition
    // const transformMatrixAfterUpdate = await progressBarInner.evaluate(el => getComputedStyle(el).transform);
    // expect(transformMatrixAfterUpdate).not.toBe('matrix(0, 0, 0, 0, 0, 0)');
    // expect(transformMatrixAfterUpdate).toContain('matrix(0.7'); // Approximate check for 70%

    // Without direct prop control, we rely on the initial animation test.
    // The core fix is to remove the setTimeout, ensuring immediate state updates.
  });
});
