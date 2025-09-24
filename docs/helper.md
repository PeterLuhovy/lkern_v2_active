
docker compose up -d --build
docker-compose restart api_gateway
docker compose up -d --build web_ui
 

L:\system\l-kern\scripts\tree_folder_structure_ascii.ps1 "L:\system\l-kern" 
L:\system\l-kern\scripts\tree_folder_structure_unicode.ps1 "L:\system\l-kern"


v powershell ako spravca
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Stlač Ctrl + Shift + P, čím otvoríš paletu príkazov (Command Palette).
Začni písať "Python: Select Interpreter". Vyber túto možnosť, keď sa objaví.


-------------------- Uv commands --------------------


uv venv .venv
uv pip install -r requirements.txt    instalacia balikov zo suboru requirements to -r znamena ze sa budu instalovat baliky zo suboru
uv pip install -r requirements.txt --link-mode=copy
.venv\Scripts\activate
uv add -r requirements.txt      pridanie zavislosti z requirements.txt do .toml
 uv pip list
  uv pip freeze > requirements.txt

uv init .   pre základnú štruktúru v aktuálnom adresári 


toml# pyproject.toml (špecifikuje rozsahy)
dependencies = ["numpy>=1.20.0"]

# uv.lock (obsahuje presné verzie)
numpy==1.24.3


# UV automaticky vytvorí/aktualizuje lock súbor
uv pip install numpy

# Inštalácia presne podľa lock súboru
uv pip sync uv.lock

# Aktualizácia lock súboru
uv pip compile pyproject.toml

uv pip install fastapi, pydantic, httpx, uvicorn










-------------------- Docker commands --------------------

docker ps -a                                    - zoznam vsetkych kontajnerov -a vratane ukoncenych                          
docker compose up -d
docker compose up -d --build
docker compose down -v                            - zastavi sluzby a odstrani kontajnery -v zmaze vsetky named volumes
docker compose up -d --build --no-cache
docker compose down --rmi all                     - odstráni aj obrazy, čo by znamenalo, že pri ďalšom docker compose up by sa obraz musel znova budovať od začiatku (a knižnice by sa znova sťahovali a inštalovali).
docker start -a lkms040_orchestrator_v0.1.0_mvp       - Pridanie -a (attach) spôsobí, že sa výstup hlavného procesu kontajnera (jeho logy) zobrazia priamo v tvojom termináli. Je to užitočné na ladenie.
docker start -a lkms010_email_processor
docker logs -f lkms010_email_processor
docker compose run --rm lkms010_email_processor bash

docker exec -it postgres_db bash

docker-compose restart api_gateway


docker logs -f lkm001-orders-service
docker logs -f lkm002-customers-service
docker logs -f lkm003-parts-service

docker exec -it lkm001-orders-service bash
docker exec -it lkm003-parts-service bash

docker logs -f lkm001-orders-service | tail -20

docker volume rm l-kern_lkm001_orders_data
docker volume rm l-kern_lkm002_customers_data
docker volume rm l-kern_lkm003_parts_data

docker compose up -d --build web_ui






import logging
len warning a error sa ukazuje v logu v dockery

logging.warning("==================================================")
logging.warning(f"Aktuálna cesta (Path.cwd()): {current_path}")
logging.warning("==================================================")
#logging.info("Toto je informačná správa.")
#logging.warning("Pozor, toto je varovanie!")
#logging.error("Nastala chyba v aplikácii.")


-------------------- Curl commands --------------------
curl http://127.0.0.1:8000


-------------------- Others --------------------
Pokročilejšia štruktúra
moj_projekt/
├── main.py
├── config.py
├── models/
│   ├── __init__.py
│   ├── base.py          # Základná trieda
│   ├── user.py
│   └── product.py
├── services/
│   ├── __init__.py
│   ├── base_service.py  # Základný service
│   ├── user_service.py
│   └── product_service.py
├── controllers/
│   ├── __init__.py
│   └── api_controller.py
├── utils/
│   ├── __init__.py
│   ├── validators.py
│   └── formatters.py
└── tests/
    ├── __init__.py
    ├── test_models.py
    └── test_services.py






CSS:
/* 1 hodnota - všetky strany rovnako */
padding: 10px;                /* top, right, bottom, left = 10px */

/* 2 hodnoty - vertikálne, horizontálne */
padding: 10px 20px;           /* top+bottom=10px, left+right=20px */

/* 3 hodnoty - top, horizontálne, bottom */
padding: 10px 20px 30px;      /* top=10px, left+right=20px, bottom=30px */

/* 4 hodnoty - v smere hodinových ručičiek */
padding: 10px 20px 30px 40px; /* top=10px, right=20px, bottom=30px, left=40px */