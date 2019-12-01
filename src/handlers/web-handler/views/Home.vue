<template>
  <div class="error-page">
    <nav>
      <div class="error-panel">
        <p v-if="error">{{ error.type }}</p>
        <h4 v-if="error">{{ error.message }}</h4>
      </div>

      <div class="stack-frames">
        <p class="stack-title">
          <small v-if="error">Stack frames ({{ error.stack.length }})</small>
        </p>

        <ul v-if="error">
          <li
            v-for="(item, index) in error.stack"
            :key="index"
            :class="{ active: current === item }"
            @click="current = item">

            <div>
              <span class="frame-number">{{ error.stack.length - index }}</span>
              <span class="frame-method">{{ item.functionName || 'Unknown' }}</span>
            </div>

            <p class="frame-file">{{ truncateStackFile(item) }}</p>
          </li>
        </ul>
      </div>
    </nav>

    <section class="code">
      <p v-if="current">{{ current.fileName }}</p>

      <div
        v-if="current"
        v-highlightjs="{ language: 'typescript', code: current.fileContents, stack: current }"
        class="code-container">

        <div class="line-numbers"></div>

        <pre>
          <code></code>
        </pre>
      </div>

      <p v-if="current">No comments for this stack frame.</p>
    </section>

    <section class="info"></section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { JsonError } from '@/handlers/Error';
import { JsonStackFrame } from '@/handlers/StackFrame';

interface AppInfo {
  error: JsonError;
  current?: JsonStackFrame;
}

const PostController = `import { IResponse } from '../../contracts/http/IResponse';
import { JsonResponse } from '../responses/JsonResponse';
import { MySQLBuilder } from '../../database/MySQL/MySQLBuilder';
import { NonPersistentConfig } from '@kingga/kc-config';
import Container from '@kingga/kc-container';

export class PostController {
  public static index(): Promise<IResponse> {
    return new Promise((resolve) => {
      new MySQLBuilder(new NonPersistentConfig({}, new Container()))
        .table('users')
        .where('id', '=', 1)
        .first()
        .then((value: object | null) => resolve(new JsonResponse(value || {})))
        .catch((error: object) => resolve(new JsonResponse(error)));
    });
  }
}`;

export default Vue.extend({
  name: 'app',

  data(): AppInfo {
    return {
      error: {
        type: 'Error',
        message: 'Something broke!',
        stack: [
          {
            columnNumber: 13,
            lineNumber: 26,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\src\\database\\MySQL\\MySQLBuilder.ts',
            functionName: 'new MySQLBuilder',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 6,
            lineNumber: 8,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\src\\http\\controllers\\PostController.ts',
            functionName: 'Promise',
            args: [],
            fileContents: PostController,
          },
          {
            columnNumber: 12,
            lineNumber: 9,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\src\\http\\controllers\\PostController.ts',
            functionName: 'Object.index [as controller]',
            args: [],
            fileContents: PostController,
          },
          {
            columnNumber: 30,
            lineNumber: 96,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\src\\http\\Router.ts',
            functionName: '',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 5,
            lineNumber: 95,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\node_modules\\express\\lib\\router\\layer.js',
            functionName: 'Layer.handle [as handle_request]',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 13,
            lineNumber: 137,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\node_modules\\express\\lib\\router\\route.js',
            functionName: 'next',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 3,
            lineNumber: 112,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\node_modules\\express\\lib\\router\\route.js',
            functionName: 'Route.dispatch',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 5,
            lineNumber: 95,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\node_modules\\express\\lib\\router\\layer.js',
            functionName: 'Layer.handle [as handle_request]',
            args: [],
            fileContents: '',
          },
          {
            columnNumber: 22,
            lineNumber: 281,
            fileName: 'E:\\Development\\portfolio\\blog\\server\\node_modules\\express\\lib\\router\\index.js',
            functionName: '',
            args: [],
            fileContents: '',
          },
        ],
      },
      current: undefined,
    };
  },

  methods: {
    truncateStackFile(stack: JsonStackFrame): string {
      const max = 37;
      const { fileName, lineNumber } = stack;
      let file = `${fileName}:${lineNumber}`;

      if (file.length > max) {
        file = `...${file.substr(file.length - (max - 3))}`;
      }

      return file;
    },
  },

  mounted(): void {
    this.current = this.error.stack[0] || undefined;
  },
});
</script>
