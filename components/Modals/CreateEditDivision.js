import React, { useState } from "react";
import { Alert, Button, Col, Form, Input, message, Modal, Select } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutateCreateDivision, useSelectDivision } from "../../hooks/fetching/divisions.hooks";

const validationSchema = yup.object({
	nombre: yup.string().required("El nombre es obligatorio"),
	nivel: yup.number().required("El nivel es obligatorio"),
	colaboradores: yup
		.number()
		.required("El número de colaboradores es obligatorio"),
	embajador: yup.string(),
	subdivisiones: yup.array(),
	divisionSuperior: yup.number().nullable(),
});

const CreateEditDivision = ({ isOpen, onClose, idDivision = "" }) => {
	
	const {mutate: createDivision, isLoading: loadCreate } = useMutateCreateDivision();
	
	const [messageApi, contextHolder] = message.useMessage();
	
	const [initialState, setInitialState] = useState({
		nombre: "",
		nivel: 0,
		colaboradores: 0,
		embajador: "",
		subdivisiones: [],
		divisionSuperior: "",
	});
	
	const [selectData, isLoadingSelect] = useSelectDivision();
	
	const formik = useFormik({
		initialValues: initialState,
		validationSchema,
		onSubmit: (values) => {
			createDivision({
				data: values,
			}, {
				onSuccess: () => {
					messageApi.success("División creada con éxito");
					formik.resetForm();
				}
			});
		},
	});
	
	
	const footerCustom = <></>;
	return (
		<Modal
			title={idDivision ? "Editar división" : "Crear división"}
			open={isOpen}
			onCancel={onClose}
			footer={footerCustom}
		>
			<Form onFinish={formik.handleSubmit}>
				<Form.Item label="Nombre de la división" name="nombre">
					<Input
						placeholder="Nombre de la división"
						value={formik.values.nombre}
						name="nombre"
						onChange={formik.handleChange}
					/>
				</Form.Item>
				<Form.Item label="División superior" name="divisionSuperior">
					<Select
						placeholder="División superior"
						value={formik.values.divisionSuperior}
						onChange={(value) => {
							formik.setFieldValue("divisionSuperior", value);
						}}
					>
						<Select.Option value={""}>Ninguna</Select.Option>
						{selectData?.map((division) => (
							<Select.Option
								key={division.value}
								value={division.value}
							>
								{division.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Nivel" name="nivel">
					<Input
						placeholder="Nivel"
						value={formik.values.nivel}
						name="nivel"
						onChange={(e) => {
							if (e.target.value.match(/^[0-9]*$/)) {
								formik.setFieldValue("nivel", e.target.value);
							} else {
								formik.setFieldValue("nivel", 0);
							}
						}}
					/>
				</Form.Item>
				<Form.Item label="Colaboradores" name="colaboradores">
					<Input
						placeholder="Colaboradores"
						value={formik.values.colaboradores}
						name="colaboradores"
						onChange={(e) => {
							if (e.target.value.match(/^[0-9]*$/)) {
								formik.setFieldValue(
									"colaboradores",
									e.target.value
								);
							} else {
								formik.setFieldValue("colaboradores", 0);
							}
						}}
					/>
				</Form.Item>
				<Form.Item label="Subdivisiones" name="subdivisiones">
					<Select
						placeholder="Subdivisiones"
						value={formik.values.subdivisiones}
						mode="multiple"
						onChange={(value) => {
							formik.setFieldValue("subdivisiones", value);
						}}
					>
						{selectData?.map((division) => (
							<Select.Option
								key={division.value}
								value={division.value}
							>
								{division.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Embajador" name="embajador">
					<Input
						placeholder="Embajador"
						value={formik.values.embajador}
						name="embajador"
						onChange={formik.handleChange}
					/>
				</Form.Item>
				{Object.keys(formik.errors).length > 0 && (
					<Alert
						description={`${
							formik.errors[Object.keys(formik.errors)[0]]
						}`}
						type="error"
						showIcon
					/>
				)}

				<Col
					xs={24}
					style={{
						display: "flex",
						gap: "1rem",
						margin: "2rem 0",
						justifyContent: "flex-end",
					}}
				>
					<Button onClick={onClose} htmlType="button">
						Cancelar
					</Button>
					<Button type="primary" htmlType="submit">
						Guardar
					</Button>
				</Col>
			</Form>
		</Modal>
	);
};

export default CreateEditDivision;
