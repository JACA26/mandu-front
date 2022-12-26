import { Avatar, Badge, Col, Dropdown, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";

const NavBar = () => {
	const menuItems = [
		{
			key: "menu-dashboard",
			label: (
                <Link 
                    href="/dashboard" 
                    className="md-link"
                >
                    <span>Dashboard</span>
                </Link>
            ),
			subMenu: [],
		},
		{
			key: "menu-organizacion",
			label: (
                <Link href="/organizacion" className="md-link">
                    <span>Organización</span>
                </Link>
            ),
			subMenu: [],
		},
		{
			key: "menu-modelos",
			label: (
                <Link href="/modelos" className="md-link">
                    <span>Modelos</span>
                    <BsIcons.BsChevronDown size={15}/>
                </Link>
            ),
			subMenu: [
				{
					key: "menu-modelos-modelo1",
					label: (
                        <Link href="/modelos/modelo-1" className="md-link">
                            <span>Modelo 1</span>
                        </Link>
                    ),
				},
			],
		},
		{
			key: "menu-seguimiento",
			label: (
                <Link href="/seguimiento" className="md-link">
                    <span>Seguimiento</span>
                    <BsIcons.BsChevronDown size={15}/>
                </Link>
            ),
			subMenu: [
				{
					key: "menu-seguimiento-seguimiento1",
					label: (
                        <Link href="/seguimiento/seguimiento-1" className="md-link">
                            <span>Seguimiento 1</span>
                        </Link>
                    ),
				},
			],
		},
	];
    
	return (
		<Row className="navbar">
			<Col 
                className="menu-left"
                xs={24}
                md={12}
            >
				<div className="image-container">
					<Image
						alt="Mandü Logo"
						src="/images/logo-white.svg"
						width={80}
						height={80}
					/>
				</div>
                <div className="menu-items">
                    {menuItems.map((item, i) => (
                        item.subMenu.length === 0 ? (
                            item.label
                        ) : (
                            <Dropdown
                                key={i}
                                menu={{
                                    items: item.subMenu,
                                }}
                            >
                                {item.label}
                            </Dropdown>
                        )
                    ))}
                </div>
			</Col>
			<Col 
                className="menu-right"
                xs={24}
                md={12}
            >
                <span className="md-link">
                    <CgIcons.CgToolbox size={20} />
                </span>
                <span className="md-link">
                    <BsIcons.BsFillQuestionCircleFill size={20} />
                </span>
                <span className="md-link">
                    <Badge count={5}>
                        <BsIcons.BsFillBellFill size={20} color="#FFF" />
                    </Badge>
                </span>
                
                <div className="profile-menu">
                    <Avatar className="profile-avatar">
                        A
                    </Avatar>
                    <span>Administrador</span>
                    <BsIcons.BsChevronDown size={15}/>
                </div>
                
                <div className="image-container">
					<Image
						alt="Mandü Logo"
						src="/images/logo-black.svg"
						width={80}
						height={80}
					/>
				</div>
            </Col>
		</Row>
	);
};

export default NavBar;
