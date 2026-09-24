import { test, expect } from '@playwright/test';

test.describe('Тесты для страницы "Конструктор"', () => {
  test('example', async ({ page }) => {
    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
    });
    await page.goto('/');
    await expect(page.getByText('Соберите бургер')).toBeVisible({ timeout: 20000 });
  });
  test('Пользователь может открыть и закрыть модальное окно с описанием ингредиента', async ({
    page,
  }) => {
    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
    });

    await page.goto('/');
    await page.getByText('Краторная булка N-200i').click({ timeout: 20000 });

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible({ timeout: 20000 });
    await expect(modal).toContainText('Краторная булка N-200i');
    await expect(modal).toContainText('80');

    await page.getByTestId('close').click();
    await expect(modal).not.toBeVisible();
  });
  test('Пользователь может добавить ингредиенты, изменить их порядок и создать заказ', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'Bearer test.token');
    });

    await page.routeFromHAR('./e2e/hars/user.har', {
      url: '**/auth/user',
      update: false,
    });

    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
    });

    await page.routeFromHAR('./e2e/hars/order.har', {
      url: '**/orders',
      update: false,
    });

    await page.goto('/');

    const bun = page.getByText('Краторная булка N-200i');
    const main = page.getByText('Хрустящие минеральные кольца');
    const sauce = page.getByText('Соус Spicy-X');
    const bunDropZone = page.getByTestId('bunDrop');
    const mainDropZone = page.getByTestId('mainDrop');

    await bun.dragTo(bunDropZone);
    await expect(bunDropZone).toContainText('Краторная булка N-200i', {
      timeout: 20000,
    });

    await main.dragTo(mainDropZone);
    await sauce.dragTo(mainDropZone);
    const itemsMain = mainDropZone.locator('li');
    await expect(itemsMain.nth(0)).toContainText('Хрустящие минеральные кольца', {
      timeout: 20000,
    });
    await expect(itemsMain.nth(1)).toContainText('Соус Spicy-X', { timeout: 20000 });

    const constructorMain = itemsMain.nth(0);
    const constructorSauce = itemsMain.nth(1);

    await constructorMain.dragTo(constructorSauce);

    await expect(itemsMain.nth(0)).toContainText('Соус Spicy-X', { timeout: 20000 });
    await expect(itemsMain.nth(1)).toContainText('Хрустящие минеральные кольца', {
      timeout: 20000,
    });

    await page.getByText('Оформить заказ').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible({ timeout: 20000 });
    await expect(modal).toContainText('2557', { timeout: 30000 });
    await page.getByTestId('close').click();
    await expect(modal).not.toBeVisible();
  });
});
