import pytest
from sefaria.model import *
from sefaria.model.webpage import WebPage

title_good_url = "Dvar Torah"

@pytest.fixture(scope='module')
def create_good_web_page():
	data_good_url = {'url': 'http://blogs.timesofisrael.com/dvar-torah2',
									 'title': title_good_url,
									 'description': 'A Dvar Torah on Times of Israel',
									 'refs': ["Haamek Davar on Genesis, Kidmat Ha'Emek 1", 'Shulchan Aruch, Orach Chaim 7:1']}

	result = WebPage().add_or_update_from_linker(data_good_url)
	webpage = WebPage().load({"url": data_good_url["url"]})
	yield {"result": result, "webpage": webpage, "data": data_good_url}
	WebPage().load({"url": data_good_url["url"]}).delete()

def test_add_bad_domain_from_linker():
	#localhost:8000 should not be added to the linker, so make sure attempting to do so fails

	data = {'url': 'http://localhost:8000/static/test/linker_test.html',
					'title': 'Linker Test Page',
					'description': 'A Page We Do Not Want',
					'refs': ["Haamek Davar on Genesis, Kidmat Ha'Emek 1", 'Shulchan Aruch, Orach Chaim 7:1']}

	assert WebPage().add_or_update_from_linker(data) == "excluded"

def test_add_no_refs_from_linker():
	# blogs.timesofisrael.com/random should not be added to the linker, because it contains no refs
	# even though it's a good URL

	data = {'url': 'http://blogs.timesofisrael.com/random',
					'title': 'Random Blog',
					'description': 'A Page We Do Not Want',
					'refs': []}

	assert WebPage().add_or_update_from_linker(data) == "excluded"


def test_add_bad_title_from_linker():
	# http://rabbisacks.com/archives should not be added because it has a title we do not want

	data = {'url': 'http://rabbisacks.org/archives',
					'title': 'Page 1 of 2',
					'description': 'A Page We Do Not Want',
					'refs': ["Genesis 1:1"]}

	assert WebPage().add_or_update_from_linker(data) == "excluded"



def test_add_and_update_good_url_from_linker(create_good_web_page):
	#blogs.timesofisrael.com is a whitelisted site with refs and good title so it should be added to the linker,
	#so make sure attempting to do so succeeds
	result, webpage, data = create_good_web_page["result"], create_good_web_page["webpage"], create_good_web_page["data"]
	assert result == "saved"
	linker_hits = webpage.linkerHits

	# now, we simply update an existing site with different refs and make sure it updated
	data['refs'] = ["Genesis 3:3", 'Exodus 3:10']

	assert WebPage().add_or_update_from_linker(data) == "saved"
	assert set(WebPage().load({"url": data["url"]}).refs) == set(["Genesis 3:3", 'Exodus 3:10'])
	assert WebPage().load({"url": data["url"]}).linkerHits == linker_hits + 1




def test_update_blank_title_from_linker(create_good_web_page):
	result, webpage, data = create_good_web_page["result"], create_good_web_page["webpage"], create_good_web_page["data"]
	print(webpage.contents())
	assert result == "saved"

	data["title"] = ""



	assert WebPage().add_or_update_from_linker(data) == "saved"
	print(WebPage().load({"url": data["url"]}).contents())
	assert WebPage().load({"url": data["url"]}).title == title_good_url