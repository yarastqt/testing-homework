import React from "react";

import { render, waitFor } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { ProductShortInfo } from "../../src/common/types";
import { container } from "webpack";

interface RenderApplicationConfig {
  initialUrl?: string;
  api?: ExampleApi;
}

function renderApplication(config: RenderApplicationConfig = {}) {
  const { initialUrl = "/", api = new ExampleApi("/") } = config;
  const cart = new CartApi();
  const store = initStore(api, cart);

  return render(
    <MemoryRouter initialIndex={0} initialEntries={[initialUrl]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
}

function getPathname(input: string = "") {
  const url = new URL(input);
  return url.pathname;
}

describe("шапка страницы", () => {
  test("отображаются ссылки на страницы магазина", () => {
    const { container } = renderApplication();
    const links = Array.from(
      container.querySelectorAll(".Application-Menu .nav-link")
    ) as HTMLAnchorElement[];

    // const menu = createFragment(containet)

    // expect(menu.links['Catalog']).toHavePath('/catalog')
    // expect(menu.links['Catalog']).toHavePath('/catalog')
    // expect(menu.links['Catalog']).toHavePath('/catalog')
    // expect(menu.links['Catalog']).toHavePath('/catalog')

    const catalogLink = links.find((link) => link.textContent === "Catalog");
    expect(getPathname(catalogLink?.href)).toBe("/catalog");

    const deliveryLink = links.find((link) => link.textContent === "Delivery");
    expect(getPathname(deliveryLink?.href)).toBe("/delivery");

    const contactsLink = links.find((link) => link.textContent === "Contacts");
    expect(getPathname(contactsLink?.href)).toBe("/contacts");

    const cardLink = links.find((link) => link.textContent?.startsWith("Cart"));
    expect(getPathname(cardLink?.href)).toBe("/cart");
  });

  test("название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const { container } = renderApplication();
    const logo = container.querySelector(
      ".Application-Brand"
    ) as HTMLAnchorElement | null;

    expect(getPathname(logo?.href)).toBe("/");
  });
});

describe("в магазине должны быть страницы", () => {
  test("главная", () => {
    const { container } = renderApplication({ initialUrl: "/" });
    const content = container.querySelector(".Home");

    expect(content).toBeDefined();
  });

  test("каталог", () => {
    const { container } = renderApplication({ initialUrl: "/catalog" });
    const content = container.querySelector(".Catalog");

    expect(content).toBeDefined();
  });

  test("условия доставки", () => {
    const { container } = renderApplication({ initialUrl: "/delivery" });
    const content = container.querySelector(".Delivery");

    expect(content).toBeDefined();
  });

  test("контакты", () => {
    const { container } = renderApplication({ initialUrl: "/contacts" });
    const content = container.querySelector(".Contacts");

    expect(content).toBeDefined();
  });
});

describe("Страница каталога", () => {
  test("в каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const api = new ExampleApi("/");
    api.getProducts = jest.fn().mockResolvedValue([
      {
        id: 51,
        name: "Refined Sausages",
        price: 100,
      },
    ]);

    const { findAllByTestId } = renderApplication({
      api,
      initialUrl: "/catalog",
    });

    const items = await findAllByTestId("51");

    const name = items[1]?.querySelector(".ProductItem-Name");
    expect(name?.textContent).toBe("Refined Sausages");

    const price = items[1]?.querySelector(".ProductItem-Price");
    expect(price?.textContent).toBe("$100");
  });
});

describe("Страница товара", () => {
  test("название товара, его описание", async () => {
    const api = new ExampleApi("/");
    api.getProductById = jest.fn().mockResolvedValue({
      id: 51,
      name: "Intelligent Hat",
      description: "The Nagasaki Lander",
      material: "Soft",
      color: "Purple",
      price: 100,
    });

    const { findByTestId } = renderApplication({
      api,
      initialUrl: "/catalog/51",
    });

    const details = await findByTestId("product-details");

    const name = details?.querySelector(".ProductDetails-Name");
    expect(name?.textContent).toBe("Intelligent Hat");

    const description = details?.querySelector(".ProductDetails-Description");
    expect(description?.textContent).toBe("The Nagasaki Lander");
  });
});
