import React, { useState, useEffect } from 'react';
import { Form, Input, PageHeader, Button, Row, Col, Spin, Card, message } from 'antd';
import axiosInstance from './Parts/axios'
import { useHistory } from 'react-router-dom';
import InputMask from "react-input-mask";


export default function Regist() {


	const history = useHistory()
	const initialFormData = Object.freeze({
		phone: '',
		password: '',
	})

	const [formData, updateFormData] = useState(initialFormData)

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

	const { Meta } = Card

	return (
		<div
			className='container'
			style={{ textAlign: 'center' }}
		>
			<PageHeader
				className="site-page-header"
				onBack={() => history.push('/')}
				title="На главную"
			// subTitle="This is a subtitle"
			/>

			<Row
				justify='center'
				style={{ marginTop: '10%' }}
			>

				<Col
					style={{ width: 700 }}
				>
					<Card
						style={{
							width: '100%',
							boxShadow: '0 5px 10px rgba(150,170,180,0.8)',
						}}
					>
						<Row

						>

							<Col
								style={{ width: '55%' }}
							>

								<Meta
									avatar={
										<img
											height={`100%`}
											width={`100%`}
											src="https://picsum.photos/1080/1400/?blur"
										/>
									}
								/>
							</Col>
							<Col
								style={{ width: '45%' }}
							>
								<Form
									layout='vertical'
									onFinish={handleSubmit}
								>

									<h1
										style={{ paddingBottom: '2rem' }}
									>Регистрация
									</h1>

									<Form.Item
										label="Номер телефона"
										name="phone"
										onChange={handlePhoneChange}
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
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											// loading={loading}
											// onClick={handleOk}
											size='large'
											block
										>Далее
          		</Button>
									</Form.Item>

									<a
										href="/login"
									>
										Войти
        					</a>

								</Form>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
