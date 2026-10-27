import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.upquery.com';

test.describe('UpQuery - Home', () => {
  test('CT01 - Deve carregar a home com título, headline e CTA principal', async ({ page }) => {
    // Arrange
    const tituloEsperado = /UpQuery/i;
    const headlineEsperada = /camada estratégica entre seus dados e suas decisões/i;

    // Act
    await page.goto(BASE_URL);

    // Assert
    await expect(page).toHaveTitle(tituloEsperado);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(headlineEsperada);
    await expect(
      page.getByRole('link', { name: /Agendar demonstração/i }).first()
    ).toBeVisible();
  });

  test('CT02 - Deve navegar para a página Plataforma pelo menu principal', async ({ page }) => {
    // Arrange
    await page.goto(BASE_URL);
    const linkPlataforma = page
      .getByRole('link', { name: 'Plataforma', exact: true })
      .first();

    // Act
    await linkPlataforma.click();

    // Assert
    await expect(page).toHaveURL(/\/plataforma\/?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('CT03 - Deve redirecionar para a página de contato ao clicar em "Agendar demonstração"', async ({ page }) => {
    // Arrange
    await page.goto(BASE_URL);
    const ctaAgendar = page
      .getByRole('link', { name: /Agendar demonstração/i })
      .first();

    // Act
    await ctaAgendar.click();

    // Assert
    await expect(page).toHaveURL(/\/contato\/?$/);
    await expect(page.locator('form').first()).toBeVisible();
  });
});