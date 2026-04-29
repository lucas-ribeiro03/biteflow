type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="px-8 py-4">{children}</div>;
};

export default Container;
