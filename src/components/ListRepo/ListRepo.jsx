import React from 'react';

function ListRepo({ repo }) {
	return (
		<li className="list-group-item" key={repo.id.toString()}>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='d-flex flex-column'>
					<a className='h5 mb-0 text-decoration-none' href={repo.url}>{repo.name}</a>
					{
						repo.description ? (<p className='small'>{repo.description}</p>) : (<p className='text-secondary txt-bold fst-italic'>Description is not Available</p>)
					}
				</div>
				<span style={{ fontSize: ".6em" }} className={`px-1 py-1 ms-1 d-inline-block btn btn-sm ${ repo.viewerSubscription === 'SUBSCRIBED' ? 'btn-success' : 'btn-outline-secondary'  } `}>
					{repo.viewerSubscription}
				</span>
			</div>
		</li>
	)
}

export default ListRepo;