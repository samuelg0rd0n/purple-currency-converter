import React from 'react';


const CurrencyConvertor = () => {
	return (
		<form>
			<div className="form-row form-group">
				<div className="col-8">
					<input type="text" className="form-control form-control-lg" />
				</div>
				<div className="col-4">
					<select className="form-control form-control-lg">
						<option>USD</option>
					</select>
				</div>
			</div>

			<button className="btn btn-primary btn-lg form-group">
				Convert 👇
			</button>

			<div className="form-row">
				<div className="col-8">
					<input type="text" className="form-control form-control-lg" disabled />
				</div>
				<div className="col-4">
					<select className="form-control form-control-lg">
						<option>USD</option>
					</select>
				</div>
			</div>


		</form>
	);

}

export default CurrencyConvertor;