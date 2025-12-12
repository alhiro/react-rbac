"use client";

import { useSearchParams } from "next/navigation";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useState } from "react";
import { api } from "@/lib/api";

const { Title, Text } = Typography;

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const tokenFromURL = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      invitation_token: values.token || tokenFromURL,
    };

    const res = await api("/api/register/", "POST", payload);

    if (res?.non_field_errors) message.error(res.non_field_errors[0]);
    else if (res?.message) message.error(res.message);
    else if (res.username) message.success("Registrasi berhasil!");

    setLoading(false);
  };

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
      <div className="flex justify-center px-4">
        <Card className="w-full max-w-md shadow-md">
          <Title level={3} className="text-center mb-1">
            Register
          </Title>
          <Text type="secondary" className="block text-center mb-6">
            Daftar akun baru menggunakan invitation token.
          </Text>

          <Form
            layout="vertical"
            initialValues={{ token: tokenFromURL }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Username wajib diisi" }]}
            >
              <Input placeholder="Masukkan username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email wajib diisi" },
                { type: "email", message: "Format email tidak valid" },
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password wajib diisi" }]}
            >
              <Input.Password placeholder="Masukkan password" />
            </Form.Item>

            <Form.Item label="Invitation Token" name="token">
              <Input placeholder="Token undangan" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Register
            </Button>
          </Form>

          <p className="text-sm mt-4 text-center">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
