import React from "react"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from "react-cookie";
import {
	NavLink
} from "react-router-dom";

import styles from "./footer.module.scss"

class Footer extends React.Component {
	static propTypes = {
	  cookies: instanceOf(Cookies).isRequired
	}
	/*/
	render(){return(
		<div className={styles.footer}>
			<p>Financování: Projekt je financován Ministerstvem kultury ČR z Programu aplikovaného výzkumu a vývoje národní a kulturní identity (NAKI II)</p>
		</div>
	)}

	/*/
	render(){
		return(
			<div className={styles.footer}>
				<div>
					<p>Financování: Projekt je financován Ministerstvem kultury ČR z Programu aplikovaného výzkumu a vývoje národní a kulturní identity (NAKI II)</p>
					<p>Doba realizace: 2020-2022</p>
					<p>Kód: DG20P02OVV010</p>
					<ul><li><NavLink to="/prak/login">
						Přihlášený uživatel: {this.props.cookies.get("user")}
					</NavLink></li></ul>
				</div>

				<div>
					<img src="/prak/images/logo-mkcr.jpg" alt="logo"/>
					<img src="/prak/images/logo-hu.png" alt="logo"/>
					<img src="/prak/images/logo-mff.png" alt="logo"/>
				</div>
				
				<div>
					<ul>
						{(this.props.cookies.get("permission") & 2) > 0 && <li> <NavLink to="/prak/upload">Nahrát soubor</NavLink> </li>}
						{(this.props.cookies.get("permission") & 8) > 0 && <li> <NavLink to="/prak/cms">Redakční systém</NavLink> </li>}
						{(this.props.cookies.get("permission") & 1) > 0 && <li> <NavLink to="/prak/admin">Admin</NavLink> </li>}
					</ul>
				</div>

				<div>
					{(this.props.cookies.get("permission") & 2) > 0 && <ul>
						<li> <NavLink to="/prak/input/metadata">Metadata</NavLink> </li>
						<li> <NavLink to="/prak/input/corporation">Rejstřík korporací</NavLink> </li>
						<li> <NavLink to="/prak/input/creation">Rejstřík dílo/výtvor</NavLink> </li>
						<li> <NavLink to="/prak/input/geographic">Geografický rejstřík </NavLink> </li>
						<li> <NavLink to="/prak/input/keyword">Rejstřík klíčových slov</NavLink> </li>
						<li> <NavLink to="/prak/input/person">Rejstřík osob</NavLink> </li>
						<li> <NavLink to="/prak/input/subject">Rejstřík událostí</NavLink> </li>
						<li> <NavLink to="/prak/input/family">Rejstřík rodů</NavLink> </li>
					</ul>}
				</div>
			</div>
		)
	}
	/**/
}

export default withCookies(Footer)
