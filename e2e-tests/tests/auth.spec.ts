import {test, expect} from "@playwright/test";

const URL = "http://localhost:5173/";

test("should allow user to sign in", async ({page}) => {
  await page.goto(URL);

  //get the sign-in button
  await page.getByRole("link", {name: "Sign In"}).click();

  await page.locator("[name=email]").fill("cool@cool.com");
  await page.locator("[name=password]").fill("cool12345");
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Loggedin Successfully!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});

//Registration
test("should allow user to register", async ({page}) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(URL);

  await page.getByRole("link", {name: "Register"}).click();

  await expect(
    page.getByRole("heading", {name: "Create an Account with wikiTrip.com"})
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=passwordConfirm]").fill("password123");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successfully!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});
