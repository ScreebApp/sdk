import * as Screeb from ".";

declare const window: Window & { $screeb?: Screeb.ScreebObject };

describe("Screeb", () => {
  describe("load", () => {
    afterEach(() => {
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

      expect(window.$screeb?.q).toEqual(undefined);

      Screeb.init("website-uuid", "user-uuid", { test: 123 });

      expect(window.$screeb?.q).toEqual([
        {
          args: [
            "init",
            "website-uuid",
            { identity: { id: "user-uuid", properties: { test: 123 } } },
          ],
          ko: expect.any(Function),
          ok: expect.any(Function),
          v: 1,
        },
      ]);
    });
  });
});
