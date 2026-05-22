import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Card } from "antd";
import "./Admin.css";

const Admin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setError(""); // Clear previous error
    const { username, password } = values;

    try {
      const response = await fetch("https://kaleshwarimandirannadanchhatra.org/pooja-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/admin-panel");
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <div className="admin-left-section">
          <div className="admin-overlay"></div>
          <div className="admin-text-content fade-in">
            <h1>Welcome Admin</h1>
            <p>Manage your website here</p>
          </div>
        </div>

        <div className="admin-right-section slide-in">
          <Card title="Admin Login" className="admin-login-card">
            <Form
              name="admin-login-form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              {error && <p className="admin-error-message">{error}</p>}

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
