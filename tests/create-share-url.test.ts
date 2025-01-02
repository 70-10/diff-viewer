import { createShareUrl } from "../src/create-share-url";
import { expect, test } from "vitest";

test("create share url", () => {
  // Arrange
  const href = "https://example.com/?foo=bar";
  const text1 = "text1";
  const text2 = "text2";

  // Act
  const actual = createShareUrl(href, text1, text2);

  // Assert
  expect(actual).toBe(
    "https://example.com/?foo=bar&data=N4IgLgpgHmCCIC5zTARhAGmTAQo7YATCAL5A"
  );
});
