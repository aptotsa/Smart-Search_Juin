import { render } from "@testing-library/react";
import { LoadingProgress } from "./LoadingProgress";

describe("<LodingProgress/>", () => {
  test("should render correctly", () => {
    const { container } = render(<LoadingProgress count={50} total={100} />);
    expect(container).toMatchSnapshot();
  });
});
