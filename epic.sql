--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-03-21 08:45:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 613 (class 1247 OID 17109)
-- Name: message_ss; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.message_ss AS ENUM (
    'draft',
    'sent',
    'unread'
);


ALTER TYPE public.message_ss OWNER TO admin;

--
-- TOC entry 601 (class 1247 OID 16454)
-- Name: message_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.message_status AS ENUM (
    'draft',
    'sent',
    'read'
);


ALTER TYPE public.message_status OWNER TO admin;

--
-- TOC entry 598 (class 1247 OID 16449)
-- Name: message_t; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.message_t AS ENUM (
    '0',
    '1'
);


ALTER TYPE public.message_t OWNER TO admin;

--
-- TOC entry 604 (class 1247 OID 16578)
-- Name: role; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.role OWNER TO admin;

--
-- TOC entry 607 (class 1247 OID 16584)
-- Name: role_t; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.role_t AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.role_t OWNER TO admin;

--
-- TOC entry 610 (class 1247 OID 16597)
-- Name: role_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.role_type AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.role_type OWNER TO admin;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 201 (class 1259 OID 17143)
-- Name: group_members; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.group_members (
    id integer NOT NULL,
    group_id bigint,
    member_id character varying(40) NOT NULL,
    role public.role_t DEFAULT 'user'::public.role_t
);


ALTER TABLE public.group_members OWNER TO admin;

--
-- TOC entry 200 (class 1259 OID 17141)
-- Name: group_members_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.group_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_members_id_seq OWNER TO admin;

--
-- TOC entry 2890 (class 0 OID 0)
-- Dependencies: 200
-- Name: group_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.group_members_id_seq OWNED BY public.group_members.id;


--
-- TOC entry 199 (class 1259 OID 17133)
-- Name: groups; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(40)
);


ALTER TABLE public.groups OWNER TO admin;

--
-- TOC entry 198 (class 1259 OID 17131)
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_id_seq OWNER TO admin;

--
-- TOC entry 2891 (class 0 OID 0)
-- Dependencies: 198
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- TOC entry 203 (class 1259 OID 17165)
-- Name: messages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id bigint NOT NULL,
    receiver_id bigint,
    subject character varying(40) NOT NULL,
    message character varying(40) NOT NULL,
    status public.message_ss,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    group_id bigint DEFAULT 0
);


ALTER TABLE public.messages OWNER TO admin;

--
-- TOC entry 202 (class 1259 OID 17163)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO admin;

--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 202
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 205 (class 1259 OID 17188)
-- Name: replies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.replies (
    id integer NOT NULL,
    parent_message_id bigint,
    message character varying(40)
);


ALTER TABLE public.replies OWNER TO admin;

--
-- TOC entry 204 (class 1259 OID 17186)
-- Name: replies_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.replies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.replies_id_seq OWNER TO admin;

--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 204
-- Name: replies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.replies_id_seq OWNED BY public.replies.id;


--
-- TOC entry 197 (class 1259 OID 17117)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(40),
    password character varying(128),
    first_name character varying(40),
    last_name character varying(40),
    mobile integer
);


ALTER TABLE public.users OWNER TO admin;

--
-- TOC entry 196 (class 1259 OID 17115)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2729 (class 2604 OID 17146)
-- Name: group_members id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.group_members ALTER COLUMN id SET DEFAULT nextval('public.group_members_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 17136)
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- TOC entry 2731 (class 2604 OID 17168)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 2735 (class 2604 OID 17191)
-- Name: replies id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.replies ALTER COLUMN id SET DEFAULT nextval('public.replies_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 17120)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2880 (class 0 OID 17143)
-- Dependencies: 201
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.group_members (id, group_id, member_id, role) FROM stdin;
13	13	46	admin
14	16	47	admin
15	14	48	admin
16	15	49	admin
17	14	46	admin
18	13	50	user
19	14	50	user
20	15	50	user
21	17	46	user
22	16	46	user
\.


--
-- TOC entry 2878 (class 0 OID 17133)
-- Dependencies: 199
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.groups (id, name) FROM stdin;
13	Comrades
14	Avatar
15	Gamers
16	Punkt
17	Terriers
\.


--
-- TOC entry 2882 (class 0 OID 17165)
-- Dependencies: 203
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.messages (id, sender_id, receiver_id, subject, message, status, created_on, updated_on, group_id) FROM stdin;
30	51	52	g	h	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
31	53	54	j	l	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
32	55	46	l	m	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
33	47	48	o	p	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
34	49	50	i	v	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
35	50	51	f	f	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
36	49	52	g	g	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
37	48	53	f	e	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
38	47	54	l	g	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
39	46	55	ed	d	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
40	52	53	dd	fdf	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
41	55	54	ddd	fdd	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
42	46	47	fdd	fdf	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
43	49	48	fdf	ffd	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
44	50	51	fd	fd	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
45	51	48	fdd	fdfd	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
46	52	53	fdd	dfs	unread	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
47	51	55	gdsds	fds	sent	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
48	46	47	jhg	fdsds	draft	2019-03-21 07:37:21.057938	2019-03-21 07:37:21.057938	0
\.


--
-- TOC entry 2884 (class 0 OID 17188)
-- Dependencies: 205
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.replies (id, parent_message_id, message) FROM stdin;
\.


--
-- TOC entry 2876 (class 0 OID 17117)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, email, password, first_name, last_name, mobile) FROM stdin;
46	aobikobe@gmail.com	password	Amaobi	Obikobe	98777674
47	emenike@gmail.com	password	Amaobi	Obikobe	98777674
48	ekene@gmail.com	password	Amaobi	Obikobe	98777674
49	somto@gmail.com	password	Amaobi	Obikobe	98777674
50	arinze@gmail.com	password	Amaobi	Obikobe	98777674
51	ada@gmail.com	password	Amaobi	Obikobe	98777674
52	chioma@gmail.com	password	Amaobi	Obikobe	9777674
53	chizoba@gmail.com	password	Amaobi	Obikobe	9777674
54	adaku@gmail.com	password	Amaobi	Obikobe	9877674
55	chidubem@gmail.com	password	Amaobi	Obikobe	9877764
\.


--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 200
-- Name: group_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.group_members_id_seq', 22, true);


--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 198
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.groups_id_seq', 17, true);


--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 202
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.messages_id_seq', 48, true);


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 204
-- Name: replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.replies_id_seq', 1, false);


--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 55, true);


--
-- TOC entry 2745 (class 2606 OID 17149)
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (id);


--
-- TOC entry 2741 (class 2606 OID 17140)
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- TOC entry 2743 (class 2606 OID 17138)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 17173)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 2749 (class 2606 OID 17193)
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- TOC entry 2737 (class 2606 OID 17124)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2739 (class 2606 OID 17122)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2750 (class 2606 OID 17150)
-- Name: group_members gm_group_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT gm_group_id FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- TOC entry 2752 (class 2606 OID 17179)
-- Name: messages ms_receiver; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT ms_receiver FOREIGN KEY (receiver_id) REFERENCES public.users(id);


--
-- TOC entry 2751 (class 2606 OID 17174)
-- Name: messages ms_sender; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT ms_sender FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- TOC entry 2753 (class 2606 OID 17194)
-- Name: replies re_parent_message; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT re_parent_message FOREIGN KEY (parent_message_id) REFERENCES public.messages(id);


-- Completed on 2019-03-21 08:45:23

--
-- PostgreSQL database dump complete
--

