import {test, expect} from "@playwright/test";
import path from "path";

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

test("should allow user to add a hotel", async ({page}) => {
  const randomName = `Test-Hotel ${Date.now()}`;
  await page.goto(`${URL}my-hotels/create-hotel`);

  await page.locator('[name="hotelName"]').fill(randomName);
  await page.locator('[name="city"]').fill("Test City");
  await page.selectOption('select ,[name="country"]', "India");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.locator('[name="bed"]').fill("3");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();
  await page.getByText("Yes").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="images"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", {name: "Save"}).click();
  await expect(page.getByText("Hotel Created Successfully")).toBeVisible();
});
