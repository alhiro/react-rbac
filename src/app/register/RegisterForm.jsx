"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Form, Input, Button, Typography } from "antd";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const tokenFromURL = searchParams.get("token") || "";

  const { Title, Text } = Typography;

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="w-full max-w-md shadow-md">
        <Title level={3} className="text-center mb-1">
          Register
        </Title>
        <Text type="secondary" className="block text-center mb-6">
          Daftar akun baru menggunakan invitation token.
        </Text>

        <Form layout="vertical" onFinish={onFinish} initialValues={{ token: tokenFromURL }}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input placeholder="Masukkan username" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Masukkan email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Masukkan password" />
          </Form.Item>

          <Form.Item label="Invitation Token" name="token">
            <Input placeholder="Token undangan" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
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
  );
}
