import { render } from "@testing-library/react";
import { TableRowLoader } from "./TableRowLoader";

describe("<TableRowLoader/>", () => {
  test("should render correctly", () => {
    const { container } = render(<TableRowLoader />);
    expect(container).toMatchSnapshot();
  });
});
