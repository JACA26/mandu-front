import { Button, Tabs } from "antd";
import React, { useState } from "react";
import Layout from "../components/Layout";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import DivisionesTab from "../components/DivisionesTab";

const Index = () => {
	
	const [showModalEditCreate, setShowModalEditCreate] = useState(false);
	
	const tabs = [
		{
			key: "tab-1",
			label: "Divisiones",
			children: <DivisionesTab showModal={showModalEditCreate} setShowModal={setShowModalEditCreate}/>
		},
		{
			key: "tab-2",
			label: "Colaboradores",
			children: <div>Tab 2</div>,
			disabled: true,
		},
	];
	
	const extraActions = (
		<div className="extra-actions">
			<Button 
				type="primary" 
				icon={<AiIcons.AiOutlinePlus size={20}/>} 
				onClick={() => setShowModalEditCreate(true)}
			/>
			<Button type="primary" icon={<AiIcons.AiOutlineUpload size={20} />} />
			<Button type="primary" icon={<AiIcons.AiOutlineDownload size={20} />} />
		</div>
	)
	
	return (
		<Layout>
			<div className="ant-container">
				<div className="ant-col" style={{margin:'2rem 0'}}>
					<h4>Organización</h4>
				</div>
				<Tabs 
					defaultActiveKey="tab-1" 
					items={tabs} 
					tabBarExtraContent={extraActions}
				/>
			</div>
		</Layout>
	);
};

export default Index;
