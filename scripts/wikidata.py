from SPARQLWrapper import SPARQLWrapper, JSON
import pandas as pd


sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
sparql.setQuery("""
SELECT ?idref ?p
WHERE {
  ?p wdt:P269 ?idref.
  OPTIONAL {
    ?p wdt:P1448 ?name
  }
}
""")

sparql.setReturnFormat(JSON)
results = sparql.query().convert()

data = []
for result in results["results"]["bindings"]:
    if 'name' in result:
        data.append({
            'idref': result['idref']['value'],
            'name_en': result['name']['value']
            })
print(len(data))
data = pd.DataFrame.from_records(data)
print('Nb element', data.shape)
