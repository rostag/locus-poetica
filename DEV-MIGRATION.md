❯ Updates Angular Material to v17.
Cannot update to Angular Material v17 because the project is using the legacy Material components
that have been deleted. While Angular Material v16 is compatible with Angular v17, it is recommended
to switch away from the legacy components as soon as possible because they no longer receive bug fixes,
accessibility improvements and new features.

    Read more about migrating away from legacy components: https://material.angular.io/guide/mdc-migration

    Files in the project using legacy Material components:
     - /src/app/generator/generator.module.ts
     - /src/app/generator/components/audio/audio.component.ts
     - /src/app/generator/components/audio/sample.component.ts
     - /src/app/latynizator/latynizator.module.ts
     - /src/app/monotext/monotext.module.ts

This package has 1 optional migration that can be executed.
Optional migrations may be skipped and executed after the update process, if preferred.

Select the migrations that you'd like to run [use-application-builder] Migrate application projects to the new build system.
(https://angular.dev/tools/cli/build-system-migration)

❯ Migrate application projects to the new build system.
Application projects that are using the '@angular-devkit/build-angular' package's 'browser' and/or 'browser-esbuild' builders will be migrated to use the new 'application' builder.
You can read more about this, including known issues and limitations, here: https://angular.dev/tools/cli/build-system-migration
The output location of the browser build has been updated from "docs" to "docs/browser". You might need to adjust your deployment pipeline or, as an alternative, set outputPath.browser to "" in order to maintain the previous functionality.
UPDATE angular.json (3691 bytes)
UPDATE tsconfig.json (681 bytes)
Migration completed (2 files modified).

** Executing migrations of package '@angular/core' **
