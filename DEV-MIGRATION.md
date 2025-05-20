❯ Updates Angular Material to v17. Read more about migrating away from legacy components: https://material.angular.io/guide/mdc-migration

    Files in the project using legacy Material components:
     - /src/app/generator/generator.module.ts
     - /src/app/generator/components/audio/audio.component.ts
     - /src/app/generator/components/audio/sample.component.ts
     - /src/app/latynizator/latynizator.module.ts
     - /src/app/monotext/monotext.module.ts

❯ Migrate application projects to the new build system.

Application projects that are using the '@angular-devkit/build-angular' package's 'browser' and/or 'browser-esbuild' builders will be migrated to use the new 'application' builder.

You can read more about this, including known issues and limitations, here: https://angular.dev/tools/cli/build-system-migration

The output location of the browser build has been updated from "docs" to "docs/browser". You might need to adjust your deployment pipeline or, as an alternative, set outputPath.browser to "" in order to maintain the previous functionality.
