import React from "react";
import "./../styles/components/App.css";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			name: null,
			status: null,
		};
	}
	render() {

		const getName = (e) => {
			const value = e.target.value;
			this.setState({ name: value });
		};
		const getStatus = (e) => {
			const value = e.target.value;
			this.setState({ status: value });
		};

		const addUser = () => {

			const getMax = () => {
				const idies = [];
				if(this.state.users.length > 0) {
					for(let i = 0; i < this.state.users.length; i++) {
						const elem = this.state.users[i];
						idies.push(elem.id);
					}
					return Math.max(...idies);
				}
				return 0;
			}

			const user = { id: getMax() + 1, name: this.state.name, status: this.state.status };

			if (user.name && user.status) {
				const userList = this.state.users.concat([user]);
				this.setState({ users: userList });
			}
		};

		const delElem = (id) => {
			const removed = this.state.users.filter((item) => item.id !== id);
			this.setState({ users: removed });
		};

		return (
			<div className="wrapper">
				<form action="#" className="get-info">
					<h1 className="get-info__title">Add User</h1>
					<input onChange={getName} id="name" type="text" name="name" className="get-info__input" placeholder="Name" />
					<input onChange={getStatus} id="status" type="text" name="status" className="get-info__input" placeholder="Status" />
					<button onClick={addUser} type="button" className="get-info__button">
						Add
					</button>
				</form>
				<table className="table">
					<thead>
						<tr className="table__row">
							<th className="table__cell">Id</th>
							<th className="table__cell">Name</th>
							<th className="table__cell">Status</th>
							<th className="table__cell">Action</th>
						</tr>
					</thead>
					{this.state.users.map(({ id, name, status }) => {
						return (
							<tbody key={id}>
								<tr className="table__row">
									<td className="table__cell">{id}</td>
									<td className="table__cell">{name}</td>
									<td className="table__cell">{status}</td>
									<td className="table__cell">
										<button onClick={delElem.bind(this, id)}>Delete</button>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		);
	}
}
