"use client";

import { useState } from "react";
import { api } from "@/lib/api";

import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function login(values) {
    const data = await api("/api/token/", "POST", values);
  
    if (data.access) {
      document.cookie = `access=${data.access}; path=/; SameSite=Strict`;
      document.cookie = `refresh=${data.refresh}; path=/; SameSite=Strict`;
  
      window.location.href = "/dashboard";
    } else {
      setError("Username atau password salah.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 12,
          padding: "10px 5px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Login
        </Typography.Title>
  
        <Typography.Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
          Silakan masuk untuk mengakses dashboard.
        </Typography.Paragraph>
  
        {error && (
          <Typography.Text type="danger" style={{ display: "block", marginBottom: 10 }}>
            {error}
          </Typography.Text>
        )}
  
        <Form layout="vertical" onFinish={login}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username wajib diisi" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              size="large"
            />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password wajib diisi" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              size="large"
            />
          </Form.Item>
  
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ borderRadius: 6 }}
          >
            Login
          </Button>
        </Form>
  
        <Typography.Paragraph style={{ textAlign: "center", marginTop: 25 }}>
          Belum punya akun?{" "}
          <a href="/register" style={{ color: "#1677ff" }}>
            Sign Up
          </a>
        </Typography.Paragraph>
      </Card>
    </div>
  );
  
}
