import React, { useState, useEffect, Component } from 'react';
import { Button, Col, Form, Input, PageHeader, Row, Select, Steps, message } from 'antd';
import axiosInstance from './Parts/axios'
import { useHistory } from 'react-router-dom';


export default function SignUp() {


	const history = useHistory()
	const initialFormData = Object.freeze({
		phone: '',
		password: '',
	})

	const [formData, updateFormData] = useState(initialFormData)

	const [appState, setAppState] = useState({
		loading: false,
		cities: null
	})
	useEffect(() => {
		setAppState({loading:true})
		fetch('api/city-list')
			.then((data) => data.json())
			.then((cities) => {
				setAppState({loading: false, cities: cities})
			})
		}, [setAppState])


	const handlePhoneChange = (e) => {
		updateFormData({
			...formData,
			phone: e.target.value.trim()
		})
	}
	const handlePasswordChange = (e) => {
		updateFormData({
			...formData,
			password: e.target.value.trim()
		})
	}

	const handleSubmit = () => {
		// console.log(formData)

		axiosInstance
			.post('/registration', {
				phone: formData.phone,
				password: formData.password
			})
			.then((res) => {
				{ message.success('Регистрация прошла успешно!') }
				history.push('/login')
				// console.log(res)
				// console.log(res.data)
			})
	}

	return (
		<div className='container'>
			<Row>

				<Col
					flex
					style={{ width: `95%` }}
				>
					<PageHeader
						style={{ paddingBottom: '2em' }}
						className="site-page-header"
						onBack={() => null}
						title={<h2>Регистрация пользователя</h2>}
					// subTitle="This is a subtitle"
					/>

					<Form
						labelCol={{ span: 4, }}
						wrapperCol={{ span: 12, }}
						layout="horizontal"
						onFinish={handleSubmit}
					// onFinishFailed={message.error('Произошла ошибка')}
					>

						<Form.Item
							name='phone'
							label="Номер телефона"
							rules={[
								{
									required: true,
									message: 'Номер телефона не может быть менее 12 символов',
								},
							]}
							onChange={handlePhoneChange}
						>
							<Input
								style={{ maxWidth: 200 }}
								maxLength={16}
								minLength={16}
							/>

						</Form.Item>

						<Form.Item
							name="password"
							label="Пароль"
							onChange={handlePasswordChange}
							rules={[
								{
									required: true,
									message: 'Пожалуйста введите пароль',
								},
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name='confirm'
							label="Подтверждение пароля"
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Пожалуйста подтвердите пароль',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}

										return Promise.reject(new Error('Введеные вами пароли не совпадают!'));
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							wrapperCol={{ offset: 4 }}
						>
							<Button
								type="primary"
								htmlType="submit"
							>
							Далее
        			</Button>
						</Form.Item>

					</Form>
				</Col>

				<Col>

				</Col>

			</Row>
		</div>
	)
}