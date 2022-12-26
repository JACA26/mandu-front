import { Col, Input, Radio, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDivisions } from "../hooks/fetching/divisions.hooks";
import CreateEditDivision from "./Modals/CreateEditDivision";

const DivisionesTab = ({
    showModal,
    setShowModal,
}) => {
    
    
	const [columns, setColumns] = useState([
		{
			title: "División",
			dataIndex: "nombre",
			key: "division",
			sorter: true,
			filters: [
				{
					text: "División 1",
					value: "division1",
				},
			],
		},
		{
			title: "División Superior",
			dataIndex: "parent",
			key: "divisionSuperior",
			sorter: true,
			render: (parent) => {
				if (parent) {
					return <b>{parent.nombre}</b>;
				} else {
					return <em>No tiene división superior</em>;
				}
			},
		},
		{
			title: "Colaboradores",
			dataIndex: "colaboradores",
			key: "colaboradores",
			sorter: true,
		},
		{
			title: "Nivel",
			dataIndex: "nivel",
			key: "nivel",
			sorter: true,
		},
		{
			title: "Subdivisiones",
			dataIndex: "subdivisiones",
			key: "subdivisiones",
			sorter: true,
		},
		{
			title: "Embajadores",
			dataIndex: "embajador",
			key: "embajadores",
			sorter: true,
		},
	]);
    
    const [filterItems, setFilterItems] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    
	const [tableParams, setTableParams] = useState({
		pagination: { current: 1, pageSize: 5, total: 0 },
	});
    
	const { pagination } = tableParams;
    const { pageSize, current } = pagination;
	const { data, isLoading, refetch } = useDivisions(current, pageSize);
    
	const handlePaginationChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
            filters,
            sorter,
		});
	};
    
    const onSearch = (value) => {
        if(value.trim() !== ""){
            setInputSearch(value);
            let filteredData = [];
            filteredData = data.data.filter(division => division.nombre.toLowerCase().includes(value.toLowerCase()));
            if(filteredData.length > 0){
                setFilterItems(filteredData);
            }
        }else{
            setInputSearch("");
            setFilterItems([]);
        }
    }
    
	useEffect(() => {
		if (data) {
			setTableParams({
				pagination: {
                    ...pagination,
                    total: data.total,
                    pageSize: data.per_page,
                    current: data.current_page,
                }
			});
            
            setColumns(columns.map(column => {
                if(column.dataIndex === "nombre"){
                    return {
                        ...column,
                        filters: data.data.map(division => {
                            return {
                                text: division.nombre,
                                value: division.nombre,
                            }
                        })
                    }
                }
                return column;
            }))
		}
	}, [data]);
    
	useEffect(() => {
		refetch();
	}, [tableParams]);
    
	return (
		<div className="container">
            <CreateEditDivision 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
			<Row>
				<Col
					xs={24}
					md={12}
					style={{ justifyContent: "flex-start", display: "flex" }}
				>
					<Radio.Group
						style={{
							marginBottom: 8,
						}}
						defaultValue="list"
					>
						<Radio.Button value="list">Listado</Radio.Button>
						<Radio.Button value="tree" disabled>
							Árbol
						</Radio.Button>
					</Radio.Group>
				</Col>
				<Col
					xs={24}
					md={12}
					style={{
						justifyContent: "flex-end",
						display: "flex",
						gap: "1rem",
					}}
				>
					<Select placeholder="Columnas">
						<Select.Option value="">--Proximamente--</Select.Option>
					</Select>

					<Input.Search
						placeholder="Buscar"
						style={{ maxWidth: 300 }}
                        value={inputSearch}
                        onChange={(e) => onSearch(e.target.value)}
					/>
				</Col>
			</Row>
			<Row>
				<Col xs={24}>
					<Table
						columns={columns}
						dataSource={data ? filterItems.length > 0 ? filterItems : data.data : []}
						pagination={pagination}
						loading={isLoading}
						onChange={handlePaginationChange}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default DivisionesTab;
