import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Space, Card, message } from 'antd';
import { axiosInstance } from '../../axios'
import { useHistory } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import InputMask from "react-input-mask";


export default function SignIn() {
	const history = useHistory()
	const initialFormData = Object.freeze({
		phone: '',
		password: '',
		loading: false,
	})
	const [formData, updateFormData] = useState(initialFormData)

	const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

	const handleSubmit = (e) => {
		// e.preventDefault()
		updateFormData({ ...formData, loading: true })

		axiosInstance
			.post('/token/', {
				phone: formData.phone,
				password: formData.password
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access)
				localStorage.setItem('refresh_token', res.data.refresh)
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token')
				updateFormData({ ...formData, loading: false })
				history.push('/')
				// console.log(res)
				// console.log(res.data)
			})
			.catch((err) => {
				message.error(err)
				// updateFormData({ loading: false })
			})
	}

	const { Meta } = Card

	return (
		<Row justify='center'>
			<Col xs={20} sm={10} md={8} xl={6}>
				<Form layout='vertical' style={{ textAlign: 'center', paddingTop: '40%' }} onFinish={handleSubmit}>
					<h1>Вход</h1>
					<Form.Item
						label="Номер телефона"
						onChange={handleChange}
						value={formData.phone}
						name="phone"
						style={{ textAlign: 'start' }}
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите номер телефона',
							},
						]}
					>
						<InputMask
							className='ant-input ant-input-lg'
							mask="+7(999)999-99-99"
							alwaysShowMask={true}
						/>
					</Form.Item>
					<Form.Item
						label="Пароль"
						onChange={handleChange}
						value={formData.password}
						name='password'
						style={{ marginBottom: 0, textAlign: 'start' }}
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите пароль',
							},
						]}
					>
						<Input.Password prefix={<LockOutlined />} size="large" />
					</Form.Item>
					<Form.Item>
						<a href="" style={{ float: 'right' }}>Забыли пароль?</a>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={formData.loading}
							size='large'
							block
						>Войти
						</Button>
					</Form.Item>
					<a href="/registration">
						Зарегистрироваться
					</a>
				</Form>
			</Col>
		</Row>
	)
}
