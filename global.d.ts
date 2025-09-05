declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      trigger?: "hover" | "click" | "loop" | "morph";
      colors?: string;
      delay?: string | number;
      stroke?: string;
    };
  }
}
