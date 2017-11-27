/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


declare interface String {
  hashCode(): number;
}
