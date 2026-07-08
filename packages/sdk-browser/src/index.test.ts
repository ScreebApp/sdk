import * as Screeb from ".";

declare const window: Window & { $screeb?: Screeb.ScreebObject };

describe("Screeb", () => {
  describe("load", () => {
    beforeEach(() => {
      // Reset the shared tag state between tests.
      delete window.$screeb;
      document.getElementsByTagName("html")[0].innerHTML = "";
    });

    it("should append script tag into the document head", () => {
      Screeb.load();

      expect(document.querySelector("head script")?.outerHTML).toEqual(
        // eslint-disable-next-line prettier/prettier
        "<script src=\"https://t.screeb.app/tag.js\"></script>"
      );
    });
    it("should append custom script tag into the document head", () => {
      Screeb.load({ screebEndpoint: "https://t.not-screeb.app/custom-tag.js" });

      expect(document.querySelector("head script")?.outerHTML).toEqual(
        // eslint-disable-next-line prettier/prettier
        "<script src=\"https://t.not-screeb.app/custom-tag.js\"></script>"
      );
    });
    it("should initialize $screeb queue", () => {
      Screeb.load({ screebEndpoint: "https://t.not-screeb.app/custom-tag.js" });

      expect(window.$screeb).toBeInstanceOf(Function);
    });

    it("should enqueue commands", () => {
      Screeb.load({ screebEndpoint: "https://t.not-screeb.app/custom-tag.js" });

      // load() bootstraps the queue with the internal SDK-identity command.
      expect(window.$screeb?.q).toEqual([
        {
          args: [
            "client.internal.web",
            {
              secondary_sdk_name: "sdk-browser",
              secondary_sdk_version: expect.any(String),
            },
          ],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ko: expect.any(Function),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ok: expect.any(Function),
          v: 1,
        },
      ]);

      Screeb.init("website-uuid", "user-uuid", { test: 123 });

      expect(window.$screeb?.q).toContainEqual({
        args: [
          "init",
          "website-uuid",
          { identity: { id: "user-uuid", properties: { test: 123 } } },
        ],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ko: expect.any(Function),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ok: expect.any(Function),
        v: 1,
      });
    });
  });
});
