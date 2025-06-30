import { test, expect } from '@playwright/test';

const isCI = !!process.env.CI;

test.describe('Diff Viewer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('初期画面表示', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Diff Viewer');
    await expect(page.locator('textarea').first()).toBeVisible();
    await expect(page.locator('textarea').nth(1)).toBeVisible();
    await expect(page.locator('pre')).toBeVisible();
    
    // 初期状態のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('initial-state.png');
    }
  });

  test('テキスト入力と差分表示', async ({ page }) => {
    const textarea1 = page.locator('textarea').first();
    const textarea2 = page.locator('textarea').nth(1);
    
    // テキストを入力
    await textarea1.fill('Hello\nWorld\nTest');
    await textarea2.fill('Hello\nUniverse\nTest');
    
    // 差分が表示されることを確認
    await expect(page.locator('.bg-red-100')).toContainText('- World');
    await expect(page.locator('.bg-green-100')).toContainText('+ Universe');
    
    // 差分表示のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('diff-display.png');
    }
  });

  test('URL生成とコピー機能', async ({ page }) => {
    const textarea1 = page.locator('textarea').first();
    const textarea2 = page.locator('textarea').nth(1);
    const urlInput = page.locator('input[type="text"]');
    const copyButton = page.locator('button:has-text("Copy")');
    
    // テキストを入力
    await textarea1.fill('Text A');
    await textarea2.fill('Text B');
    
    // URL生成フィールドに値が設定されることを確認（少し待つ）
    await page.waitForTimeout(500);
    await expect(urlInput).not.toHaveValue('');
    
    // コピーボタンの存在確認
    await expect(copyButton).toBeVisible();
    
    // URL機能のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('url-feature.png');
    }
  });

  test('URLパラメータからの復元', async ({ page }) => {
    // 事前に生成されたURLパラメータでアクセス
    await page.goto('/?data=N4IgLgpgHmCCIC5zTARhAGmTAQo7YATCAL5A');
    
    const textarea1 = page.locator('textarea').first();
    const textarea2 = page.locator('textarea').nth(1);
    
    // テキストが復元されることを確認
    await expect(textarea1).toHaveValue('text1');
    await expect(textarea2).toHaveValue('text2');
    
    // 復元状態のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('url-restore.png');
    }
  });

  test('レスポンシブデザイン - モバイル', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('textarea').first()).toBeVisible();
    await expect(page.locator('textarea').nth(1)).toBeVisible();
    
    // モバイル表示のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('mobile-view.png');
    }
  });

  test('レスポンシブデザイン - タブレット', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('textarea').first()).toBeVisible();
    await expect(page.locator('textarea').nth(1)).toBeVisible();
    
    // タブレット表示のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('tablet-view.png');
    }
  });

  test('大量テキストでの動作確認', async ({ page }) => {
    const longText1 = Array(50).fill('Line of text A').join('\n');
    const longText2 = Array(50).fill('Line of text B').join('\n');
    
    const textarea1 = page.locator('textarea').first();
    const textarea2 = page.locator('textarea').nth(1);
    
    await textarea1.fill(longText1);
    await textarea2.fill(longText2);
    
    // 差分が表示されることを確認
    await expect(page.locator('.bg-red-100').first()).toBeVisible();
    await expect(page.locator('.bg-green-100').first()).toBeVisible();
    
    // 大量テキスト処理のスクリーンショット（CI以外）
    if (!isCI) {
      await expect(page).toHaveScreenshot('large-text.png');
    }
  });
});