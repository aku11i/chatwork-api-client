import BuildDataJson = require("./buildData.json");

export type BuildData = NonNullable<ReturnType<typeof BuildDataJson.find>>;
