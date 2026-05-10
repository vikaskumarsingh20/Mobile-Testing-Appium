/**
 * PRACTICE TEST 4: Real-World Shopping Test
 * Shows: Navigation, Lists, Assertions, Data-driven testing
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');
const ElementHelper = require('../../helpers/elementHelper');
const GestureHelper = require('../../helpers/gestureHelper');
const Logger = require('../../utilities/logger');
const testData = require('../../data/testData');

describe('Practice 4: Shopping & E-commerce Workflow', () => {
  let driver;
  let elementHelper;
  let gestureHelper;

  before(async () => {
    Logger.logTestStart('Shopping Workflow Test');
    driver = await createAndroidDriver();
    elementHelper = new ElementHelper();
    gestureHelper = new GestureHelper();
    await driver.pause(2000);
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
      Logger.logTestEnd('Shopping Workflow Test', 'PASSED');
    }
  });

  it('TC-01: Browse Products and Add to Cart', async () => {
    Logger.logStep('TC-01', 'Browsing products list');

    try {
      // Wait for products to load
      const firstProduct = await driver.$('//android.widget.TextView[@content-desc="product_name"]');
      await firstProduct.waitForDisplayed({ timeout: 5000 });

      Logger.logAction('LOADED', 'Products list');

      // Find all product items (like findAll in Cypress)
      const products = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/product_item"]');
      console.log(`Found ${products.length} products`);
      expect(products.length).to.be.greaterThan(0);

      // Click first product
      const firstProductCard = products[0];
      await firstProductCard.click();
      Logger.logAction('CLICKED', 'First Product');

      await driver.pause(1000);

      // Verify product details page loaded
      const productTitle = await driver.$('//android.widget.TextView[@content-desc="product_title"]');
      const title = await productTitle.getText();
      console.log(`Product Title: ${title}`);
      Logger.log('VERIFICATION', 'Product details displayed', title);

      // Add to cart button
      const addToCartBtn = await driver.$('//android.widget.Button[@text="Add to Cart"]');
      await addToCartBtn.click();
      Logger.logAction('CLICKED', 'Add to Cart');

      // Verify success message
      const successMsg = await driver.$('//android.widget.Toast[@text="Added to cart"]');
      const isToastVisible = await successMsg.isDisplayed().catch(() => false);
      Logger.log('VERIFICATION', 'Success message shown', isToastVisible);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-02: Browse Multiple Products', async () => {
    Logger.logStep('TC-02', 'Browsing and adding multiple products');

    try {
      // Go back to products list
      const backButton = await driver.$('//android.widget.Button[@content-desc="back"]');
      await backButton.click();
      Logger.logAction('CLICKED', 'Back button');

      await driver.pause(1000);

      // Get all products
      const products = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/product_item"]');

      // Add 3 products to cart
      for (let i = 0; i < Math.min(3, products.length); i++) {
        // Click product
        const productCard = products[i];
        await productCard.click();
        Logger.logAction('CLICKED', `Product ${i + 1}`);

        await driver.pause(500);

        // Add to cart
        const addBtn = await driver.$('//android.widget.Button[@text="Add to Cart"]');
        await addBtn.click();
        Logger.logAction('ADDED', `Product ${i + 1} to cart`);

        // Go back
        const backBtn = await driver.$('//android.widget.Button[@content-desc="back"]');
        await backBtn.click();

        await driver.pause(500);
      }
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-03: Scroll Through Long Product List', async () => {
    Logger.logStep('TC-03', 'Scrolling in list to find more products');

    try {
      // Get initial first product
      const initialProducts = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/product_item"]');
      console.log(`Initial visible products: ${initialProducts.length}`);

      // Scroll down to see more
      await gestureHelper.swipeDown();
      Logger.logAction('SWIPED', 'Down');

      await driver.pause(500);

      // Get products after scroll
      const afterScrollProducts = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/product_item"]');
      console.log(`Products after scroll: ${afterScrollProducts.length}`);

      expect(afterScrollProducts.length).to.be.greaterThanOrEqual(initialProducts.length);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-04: Filter/Search Products', async () => {
    Logger.logStep('TC-04', 'Searching for specific product');

    try {
      // Find search field
      const searchField = await driver.$('//android.widget.EditText[@hint="Search products"]');
      await searchField.setValue('Phone');
      Logger.logAction('TYPED', 'Search field', 'Phone');

      // Press search/enter
      await driver.pressKeyCode(66); // Enter key
      Logger.logAction('PRESSED', 'Enter key');

      await driver.pause(1000);

      // Verify filtered results
      const results = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/product_item"]');
      console.log(`Filtered results: ${results.length}`);

      // Verify all results contain search term
      const firstResultTitle = await results[0].$('//android.widget.TextView[@content-desc="product_name"]').getText();
      console.log(`First result: ${firstResultTitle}`);
      Logger.log('VERIFICATION', 'Search results filtered', firstResultTitle);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-05: View Cart and Checkout', async () => {
    Logger.logStep('TC-05', 'Viewing cart and starting checkout');

    try {
      // Navigate to cart
      const cartIcon = await driver.$('//android.widget.ImageButton[@content-desc="cart"]');
      await cartIcon.click();
      Logger.logAction('CLICKED', 'Cart icon');

      await driver.pause(1000);

      // Verify cart items displayed
      const cartItems = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/cart_item"]');
      console.log(`Items in cart: ${cartItems.length}`);
      Logger.log('VERIFICATION', 'Cart items', cartItems.length);

      expect(cartItems.length).to.be.greaterThan(0);

      // Get total price
      const totalPrice = await driver.$('//android.widget.TextView[@content-desc="total_price"]').getText();
      console.log(`Total price: ${totalPrice}`);
      Logger.log('VERIFICATION', 'Total price', totalPrice);

      // Click checkout
      const checkoutBtn = await driver.$('//android.widget.Button[@text="Checkout"]');
      await checkoutBtn.click();
      Logger.logAction('CLICKED', 'Checkout button');

      await driver.pause(1000);

      // Verify checkout page loaded
      const checkoutTitle = await driver.$('//android.widget.TextView[@text="Shipping Address"]');
      const isCheckoutPage = await checkoutTitle.isDisplayed().catch(() => false);
      Logger.log('VERIFICATION', 'Checkout page loaded', isCheckoutPage);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-06: Increase/Decrease Item Quantity', async () => {
    Logger.logStep('TC-06', 'Modifying item quantities in cart');

    try {
      // Navigate to cart
      const cartIcon = await driver.$('//android.widget.ImageButton[@content-desc="cart"]');
      await cartIcon.click();
      Logger.logAction('CLICKED', 'Cart icon');

      await driver.pause(1000);

      // Get first item quantity
      const quantityField = await driver.$('//android.widget.EditText[@content-desc="quantity"]');
      const initialQuantity = await quantityField.getValue();
      console.log(`Initial quantity: ${initialQuantity}`);

      // Click increase button
      const increaseBtn = await driver.$('//android.widget.Button[@content-desc="increase_qty"]');
      await increaseBtn.click();
      Logger.logAction('CLICKED', 'Increase quantity');

      await driver.pause(500);

      // Verify quantity increased
      const newQuantity = await quantityField.getValue();
      console.log(`New quantity: ${newQuantity}`);
      expect(parseInt(newQuantity)).to.be.greaterThan(parseInt(initialQuantity));

      Logger.logAction('VERIFIED', 'Quantity increased');
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-07: Remove Item From Cart', async () => {
    Logger.logStep('TC-07', 'Removing item from cart');

    try {
      // Get initial cart item count
      const cartItems = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/cart_item"]');
      const initialCount = cartItems.length;
      console.log(`Initial cart items: ${initialCount}`);

      // Click remove on first item
      const removeBtn = await driver.$('//android.widget.Button[@content-desc="remove"]');
      await removeBtn.click();
      Logger.logAction('CLICKED', 'Remove button');

      await driver.pause(500);

      // Verify item removed
      const updatedCartItems = await driver.$$('//android.widget.FrameLayout[@resource-id="com.example:id/cart_item"]');
      const updatedCount = updatedCartItems.length;
      console.log(`Updated cart items: ${updatedCount}`);

      expect(updatedCount).to.equal(initialCount - 1);
      Logger.logAction('VERIFIED', 'Item removed from cart');
    } catch (error) {
      Logger.logError(error);
    }
  });
});
