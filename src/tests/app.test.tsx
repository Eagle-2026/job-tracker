import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import React from "react";

// Components
import AddJobForm from "@/components/forms/AddJobForm";
import LoginForm from "@/components/forms/LoginForm";
import Navbar from "@/components/Navbar";

// ---------------- Mock Next.js & other hooks ----------------
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/",  // ✅ mock pathname
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({}),
  useMutation: () => ({ mutate: jest.fn() }),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ---------------- Tests ----------------

describe("AddJobForm", () => {
  it("renders form inputs", () => {
    render(<AddJobForm />);
    expect(screen.getByPlaceholderText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Location/i)).toBeInTheDocument();
  });

  it("can type in inputs", () => {
    render(<AddJobForm />);
    fireEvent.change(screen.getByPlaceholderText(/Job Title/i), {
      target: { value: "Software Engineer" },
    });
    expect(screen.getByPlaceholderText(/Job Title/i)).toHaveValue("Software Engineer");
  });
});

describe("LoginForm", () => {
  it("renders email and password inputs", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("can type email and password", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    expect(screen.getByLabelText(/Email/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("password123");
  });
});

describe("Navbar", () => {
  it("renders site title", () => {
    render(<Navbar />);
    expect(screen.getByText(/JobTracker/i)).toBeInTheDocument();
  });
});

// navbar 

  it("renders Login and Register when unauthenticated", () => {
    render(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });


// login form submit button 

// ---------------- Mock next-auth ----------------


// Render just the login button to test click
const LoginButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick}>
    Login
  </button>
);

describe("Login button simple test", () => {
  it("renders button and allows click", () => {
    const handleClick = jest.fn();

    render(<LoginButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /login/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
