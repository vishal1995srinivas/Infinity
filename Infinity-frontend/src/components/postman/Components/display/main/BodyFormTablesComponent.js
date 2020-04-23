import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Input, Button } from 'semantic-ui-react';

class BodyFormTablesComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	handleBodyFormKeyChange = (event, index) => {
		this.props.handleBodyFormKeyChange(event, index);
	};
	handleBodyFormValueChange = (event, index) => {
		this.props.handleBodyFormValueChange(event, index);
	};

	render() {
		return (
			<div className="bodyTablesForm">
				<Table inverted size="small">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Values</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.bodyFormData.map((keyValuePair, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell>
										<Input
											fluid
											transparent
											inverted
											placeholder="userId"
											value={keyValuePair.key}
											onChange={(event) => this.handleBodyFormKeyChange(event, index)}
										/>
									</Table.Cell>
									<Table.Cell>
										<Input
											fluid
											transparent
											inverted
											placeholder="3"
											value={keyValuePair.value}
											onChange={(event) => this.handleBodyFormValueChange(event, index)}
										/>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}

export default BodyFormTablesComponent;
