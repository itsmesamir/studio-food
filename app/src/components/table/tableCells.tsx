import classNames from "clsx";

export function DivWrapper(props: {
  items: (string | JSX.Element)[];
  className?: string;
}) {
  const { items, className } = props;

  return (
    <div className={classNames(className)}>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
