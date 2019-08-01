import axios from 'axios';

import { getConfig } from '../conf';

const conf = getConfig();
export const GET_DOMAINS = 'GET_DOMAINS';
export const GET_METADATA_PAGE = 'GET_METADATA_PAGE';
export const UPDATE_DOMAIN = 'UPDATE_DOMAIN';
export const UPDATE_METADATA_ERROR = 'UPDATE_METADATA_ERROR';
export const CREATE_DOMAIN = 'CREATE_DOMAIN';
export const DELETE_DOMAIN = 'DELETE_DOMAIN';
export const DELETE_DOMAIN_SCHEMA = 'DELETE_DOMAIN_SCHEMA';
export const CREATE_DOMAIN_SCHEMA = 'CREATE_DOMAIN_SCHEMA';


export const getDomains = () => async (dispatch) => {
    try {
        const result = await axios({
            method: 'get',
            url: `${conf.endpoints.metadata}/domains`,
            withCredentials: true,
        });

        dispatch({
            type: GET_DOMAINS,
            domains: result.data.data,
            meta: result.data.meta,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getMetadataPage = page => async (dispatch) => {
    try {
        const result = await axios({
            method: 'get',
            url: `${conf.endpoints.metadata}/domains?page[number]=${page}`,
            withCredentials: true,
        });

        dispatch({
            type: GET_METADATA_PAGE,
            domains: result.data.data,
            meta: result.data.meta,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateDomain = domainData => async (dispatch) => {
    try {
        await axios({
            method: 'put',
            url: `${conf.endpoints.metadata}/domains/${domainData.id}`,
            withCredentials: true,
            json: true,
            data: {
                data: domainData,
            },
        });

        dispatch({
            type: UPDATE_DOMAIN,
        });
        dispatch(getDomains());
    } catch (err) {
        dispatch({
            type: UPDATE_METADATA_ERROR,
            err,
        });
    }
};

export const createDomain = data => async (dispatch) => {
    try {
        await axios({
            method: 'post',
            url: `${conf.endpoints.metadata}/domains`,
            withCredentials: true,
            json: true,
            data: {
                data,
            },
        });

        dispatch({
            type: CREATE_DOMAIN,
        });
        dispatch(getDomains());
    } catch (err) {
        console.log(err);
    }
};

export const deleteDomain = domainId => async (dispatch) => {
    try {
        await axios({
            method: 'delete',
            url: `${conf.endpoints.metadata}/domains/${domainId}`,
            withCredentials: true,
        });

        dispatch({
            type: DELETE_DOMAIN,
        });
        dispatch(getDomains());
    } catch (err) {
        console.log(err);
    }
};

export const createDomainSchema = data => async (dispatch) => {
    try {
        await axios({
            method: 'post',
            url: `${conf.endpoints.metadata}/domains/${data.domainId}/schemas/${data.uri}`,
            withCredentials: true,
            json: true,
            data: {
                data,
            },
        });

        dispatch({
            type: CREATE_DOMAIN_SCHEMA,
        });
        dispatch(getDomains());
    } catch (err) {
        console.log(err);
    }
};

export const deleteDomainSchema = (domainId, uri) => async (dispatch) => {
    try {
        await axios({
            method: 'delete',
            url: `${conf.endpoints.metadata}/domains/${domainId}/schemas/${uri}`,
            withCredentials: true,
        });

        dispatch({
            type: DELETE_DOMAIN_SCHEMA,
        });
        dispatch(getDomains());
    } catch (err) {
        console.log(err);
    }
};