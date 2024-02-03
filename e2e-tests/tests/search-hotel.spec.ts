import {test, expect} from "@playwright/test";

const URL = "http://localhost:5173/";
test.beforeEach(async ({page}) => {
  await page.goto(URL);

  //get the sign-in button
  await page.getByRole("link", {name: "Sign In"}).click();

  await page.locator("[name=email]").fill("cool@cool.com");
  await page.locator("[name=password]").fill("cool12345");
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Loggedin Successfully!")).toBeVisible();
});

test("should show hotel search results", async ({page}) => {
  await page.goto(URL);

  await page.getByPlaceholder("Where are you going?").fill("Bangalore");
  await page.getByRole("button", {name: "Search"}).click();

  await expect(page.getByText("Hotel found in Bangalore")).toBeVisible();
  await expect(page.getByText("Bangalore")).toBeVisible();
});
