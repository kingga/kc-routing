import Vue from 'vue';
interface Context {
    url: string;
    state: unknown;
    rendered?: () => void;
}
declare const _default: (context: Context) => Promise<Vue>;
export default _default;
