<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Cruises

                        <!-- Role -->
                        <div class="pull-rights ui-mt-15 pull-right ">
                            <div class="dropdown">
                                <span class="badge badge-md badge-pill badge-secondary-soft">
                                    {{ auth.role }}
                                </span>
                            </div>
                        </div>
                        <!-- End Role -->

                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'cruises' }">Cruises</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


         <div v-if="pgLoading" class="row h-100">
            <div class="container text-center">
                <p><br/></p>
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p><br/></p>
            </div>
        </div>

        <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">      

                
                 <!-- ******* Cards ******* -->  
                <div class="col-md-8 mb-5">

                    <!-- Card Meta -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabMeta" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Meta')"
                                            aria-expanded="false" 
                                            aria-controls="collapseMeta" 
                                            data-toggle="collapse"
                                            data-target="#collapseMeta">Meta
                                            <span id="iconToggleMeta" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseMeta" 
                                        class="collapse show" 
                                        aria-labelledby="TabMeta" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText4">Meta title</label>
                                            <input class="form-control"
                                                    id="inputText4"  
                                                    type="text" 
                                                    v-model="row.meta_title">
                                        </div>
                                        <!-- End Meta title -->
                                            
                                        <!-- Meta keywords -->
                                        <div class="form-group">
                                            <div class="pull-right f12"
                                                v-if="row.meta_keywords" 
                                                v-text="(row.meta_keywords.length)">
                                            </div>
                                            <label for="inputText5">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputText5" 
                                                    rows="5"  
                                                    v-model="row.meta_keywords">
                                            </textarea>
                                        </div>
                                        <!-- End Meta keywords -->

                                        <!-- Meta description -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_description" 
                                                v-text="(row.meta_description.length)">
                                            </div>
                                            <label for="inputText6">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputText6" 
                                                    rows="5" 
                                                    v-model="row.meta_description">
                                            </textarea>
                                        </div>
                                        <!-- End Meta description -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <!-- End Card Meta -->

                    <!-- Card Cruise -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabCruise" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Cruise')"
                                        aria-expanded="false" 
                                        aria-controls="collapseCruise" 
                                        data-toggle="collapse"
                                        data-target="#collapseCruise">Cruise
                                        <span id="iconToggleCruise" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                    <div id="collapseCruise" 
                                        class="collapse" 
                                        aria-labelledby="TabCruise" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1">Title</label>
                                        <input class="form-control" 
                                                id="inputText1" 
                                                type="text" 
                                                v-model="row.title" 
                                                @keyup="onTitleChange">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputText2">Slug</label>
                                        <input class="form-control text-lowercase"
                                                id="inputText2"  
                                                type="text" 
                                                v-model="row.slug" 
                                                @keydown.space.prevent 
                                                @paste="onSlugPaste"
                                                @change="onSlugChange">
                                    </div>
                                    <!-- End Slug -->

                                     <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText3">Short title</label>
                                        <input class="form-control" 
                                                id="inputText3" 
                                                type="text" 
                                                v-model="row.short_title">
                                    </div>
                                    <!-- End Title -->

                                    
                                    <div class="col-12 row no-padding ui-ml-unset">
                                        <!-- Start Price -->
                                        <div class="col-6 no-lpadding">
                                            <div class="form-group">
                                                <label for="inputText3">Start price</label>
                                                <input class="form-control" 
                                                        id="inputText3" 
                                                        type="number"
                                                        min="0"
                                                        v-model.number="row.start_price">
                                            </div>
                                        </div>
                                        <!-- End Title -->

                                        <!-- Order -->
                                        <div class="col-6 no-rpadding">
                                            <div class="form-group">
                                                <label for="inputText3">Order</label>
                                                <input class="form-control" 
                                                        id="inputText3" 
                                                        type="text" 
                                                        v-model="row.order">
                                            </div>
                                        </div>
                                        <!-- End Order -->
                                    </div>


                                    <!-- Inclusion -->
                                    <div class="form-group">
                                        <label for="inputEditor6">Inclusion</label>
                                        <editor
                                            id="inputEditor6"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Inclusion -->

                                    <!-- Exclusion -->
                                    <div class="form-group">
                                        <label for="inputEditor7">Exclusion</label>
                                        <editor
                                            id="inputEditor7"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Exclusion -->


                                    <!-- Facilites -->
                                    <div class="form-group">
                                        <label for="inputEditor2">Cruise Facilites</label>
                                        <editor
                                            id="inputEditor2"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Facilites -->

                                    <!-- Suite Facilites -->
                                    <div class="form-group">
                                        <label for="inputEditor3">Guest Suite Facilites</label>
                                        <editor
                                            id="inputEditor3"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Suite Facilites -->

                                    <!-- Cabin Facilites -->
                                    <div class="form-group">
                                        <label for="inputEditor4">Cabin Facilites</label>
                                        <editor
                                            id="inputEditor4"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Cabin Facilites -->

                                    <!-- Cancellation Facilites -->
                                    <div class="form-group">
                                        <label for="inputEditor5">Cancellation Facilites</label>
                                        <editor
                                            id="inputEditor5"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Cancellation Facilites -->


                                    


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputEditor1">Short body</label>
                                        <editor
                                            id="inputEditor1"
                                            v-model="row.short_body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Body -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputEditor22">body</label>
                                        <editor
                                            id="inputEditor22"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 600,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Body -->

                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Cruise -->

                    <!-- Card Price -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabPrices" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Prices')"
                                        aria-expanded="false" 
                                        aria-controls="collapsePrices" 
                                        data-toggle="collapse"
                                        data-target="#collapsePrices">Prices
                                        <span id="iconTogglePrices" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapsePrices" 
                                    class="collapse" 
                                    aria-labelledby="TabPrices" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- For Loop -->
                                        <div v-for="i in 10" 
                                            :key="i" 
                                            :class="(i > prices_length.length) ? 'hidden' : ''"
                                            :id="'frm_'+i">

                                             <!--  Remove -->
                                            <div class="pull-right ui-mt-10">
                                                <button v-if="i != 1"
                                                    type="button" 
                                                    class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                    @click="removeOption(i)">
                                                    <span class="btn-icon ti-close font-bold"></span>
                                                 </button>
                                            </div>
                                            <!-- End Remove -->

                                            <!-- Price Name -->
                                            <div class="form-group">
                                                <label :for="'iInput'+i">Price Name</label>
                                                <input class="form-control" 
                                                        :id="'iInput'+i" 
                                                        type="text" 
                                                        v-model="row.price_names[i]">
                                            </div>
                                            <!-- End Price Name -->

                                            
                                            <!-- Price Items -->
                                            <div v-for="x in 10" 
                                                :key="x" 
                                                :class="(x > prices_items_length[i-1]) ? 'hidden' : ''"
                                                :id="'sub_'+i+'_'+x">

                                            <div class="row col-12 ui-ml-unset">
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                    :class="(x < prices_items_length[i-1]) ? 'hidden' : ''"
                                                        :id="'subBtn_'+i+'_'+x"
                                                        @click="opnSub(i,x+1)"
                                                        class="btn btn-secondary btn-circle btn-with-icon ui-mt30 ui-ml-20">
                                                        <span class="btn-icon ti-plus font-bold"></span>
                                                    </button>
                                                </div>
                                                <div class="form-group col-5">
                                                    <label :for="'pvInput'+i+'_'+x">Price Value</label>
                                                    <input class="form-control" 
                                                            :id="'pvInput'+i+'_'+x" 
                                                            type="text" 
                                                            v-model="row.price_item_values[i+'_'+x]">
                                                </div>
                                                <div class="form-group col-5">
                                                    <label :for="'pcInput'+i+'_'+x">Content</label>
                                                    <input class="form-control" 
                                                            :id="'pcInput'+i+'_'+x" 
                                                            type="text" 
                                                            v-model="row.price_item_body[i+'_'+x]">
                                                </div>
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                        v-if="x != 1"
                                                        @click="removeSubOption(i,x)"
                                                        class="btn btn-circle btn-with-icon ui-mt30">
                                                        <span class="btn-icon ti-close font-bold"></span>
                                                    </button>
                                                </div>
                                            </div>

                                            </div>
                                            <!-- End Price Items -->


                                            <!-- Button -->
                                            <div class="row pull-right ui-mt15" 
                                                :id="'btn_'+i">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm(i+1)">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End Button -->

                                            <div class="form-group">
                                                <br/><hr><br/>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Price -->

                     <!-- Card Itinerarie -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabItineraries" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Itineraries')"
                                        aria-expanded="false" 
                                        aria-controls="collapseItineraries" 
                                        data-toggle="collapse"
                                        data-target="#collapseItineraries">Itineraries
                                        <span id="iconToggleItineraries" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
                                        </span>
                                    </h2>
                                    </div>
                                    <div id="collapseItineraries" 
                                        class="collapse" 
                                        aria-labelledby="TabItineraries" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- For Loop -->
                                        <div v-for="i in 10" 
                                            :key="'i2'+i" 
                                            :class="(i > itineraries_length.length) ? 'hidden' : ''"
                                            :id="'frm2_'+i">

                                             <!--  Remove -->
                                            <div class="pull-right ui-mt-10">
                                                <button v-if="i != 1"
                                                    type="button" 
                                                    class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                    @click="removeOption2(i)">
                                                    <span class="btn-icon ti-close font-bold"></span>
                                                 </button>
                                            </div>
                                            <!-- End Remove -->

                                            <!-- Itineraries Title -->
                                            <div class="form-group">
                                                <label :for="'iInput2'+i">Itinerarie Name</label>
                                                <input class="form-control" 
                                                        :id="'iInput2'+i" 
                                                        type="text" 
                                                        v-model="row.itinerarie_title[i]">
                                            </div>
                                            <!-- End Itineraries Title -->

                                            
                                            <!-- Itineraries Items -->
                                            <div v-for="x in 10" 
                                                :key="'t2'+x" 
                                                :class="(x > itineraries_items_length[i-1]) ? 'hidden' : ''"
                                                :id="'sub2_'+i+'_'+x">

                                            <div class="row col-12 ui-ml-unset">
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                    :class="(x < itineraries_items_length[i-1]) ? 'hidden' : ''"
                                                        :id="'subBtn2_'+i+'_'+x"
                                                        @click="opnSub2(i,x+1)"
                                                        class="btn btn-secondary btn-circle btn-with-icon ui-mt30 ui-ml-20">
                                                        <span class="btn-icon ti-plus font-bold"></span>
                                                    </button>
                                                </div>
                                                <div class="form-group col-4">
                                                    <label :for="'pvInput2'+i+'_'+x">Title</label>
                                                    <input class="form-control" 
                                                            :id="'pvInput2'+i+'_'+x" 
                                                            type="text" 
                                                            v-model="row.itinerarie_item_title[i+'_'+x]">
                                                </div>
                                                <div class="form-group col-4">
                                                    <label :for="'pbInput2'+i+'_'+x">Body</label>
                                                    <input class="form-control" 
                                                            :id="'pbInput2'+i+'_'+x" 
                                                            type="text" 
                                                            v-model="row.itinerarie_item_body[i+'_'+x]">
                                                </div>
                                                <div class="form-group col-2">
                                                    <label :for="'poInput2'+i+'_'+x">Order</label>
                                                    <input class="form-control" 
                                                            :id="'poInput2'+i+'_'+x" 
                                                            type="text" 
                                                            v-model="row.itinerarie_item_order[i+'_'+x]">
                                                </div>
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                        v-if="x != 1"
                                                        @click="removeSubOption2(i,x)"
                                                        class="btn btn-circle btn-with-icon ui-mt30">
                                                        <span class="btn-icon ti-close font-bold"></span>
                                                    </button>
                                                </div>
                                            </div>

                                            </div>
                                            <!-- End Price Items -->


                                            <!-- Button -->
                                            <div class="row pull-right ui-mt15" 
                                                :id="'btn2_'+i">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm2(i+1)">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End Button -->

                                            <div class="form-group">
                                                <br/><hr><br/>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Itinerary -->

                </div>
                <!-- ******* End Cards ******* -->


                <!-- ******* SideNav ******** -->
                <div class="col-md-4 mb-5">

                    <!-- Nav Cruise Type -->
                    <div class="card">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavType" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Type')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavType" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavType">Cruise Type
                                            <span id="iconToggleType" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavType" 
                                        class="collapse" 
                                        aria-labelledby="NavType" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Type -->
                                            <div class="form-group">
                                                <div v-if="typeLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!typeLoading" 
                                                    v-model="row.cruise_type_id">
                                                    <option value="">Select Cruise Type</option>
                                                    <option v-for="(type, index) in types" 
                                                            :key="index"
                                                            :value="type.id">
                                                            {{ type.title }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Type -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Cruise Type -->


                    <!-- Nav Cruise Cabins -->
                    <div class="card mt-5">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavRegion" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Region')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavRegion" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavRegion">Cruise Cabins
                                            <span id="iconToggleRegion" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavRegion" 
                                        class="collapse" 
                                        aria-labelledby="NavRegion" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Cabins -->
                                            <div class="form-group">
                                                <div v-if="cabinLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!cabinLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="cabinsValue" 
                                                    :options="cabinsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search cabins"
                                                    :preselect-first="false">
                                                </multiselect>
                                            </div>
                                            <!-- End Cabins -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Crusie Cabins -->

                    <!-- Nav Image -->
                    <div class="card mt-5">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavImage" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Image')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavImage" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavImage">Featued Image
                                            <span id="iconToggleImage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavImage" 
                                        class="collapse" 
                                        aria-labelledby="NavImage" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Image -->
                                            <div class="form-group">
                                                <label>Image</label>
                                                <img :src="row.preview" 
                                                    class="mb-2 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onImageChange">
                                            </div>
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                            </div>
                                            <!-- Image -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Image -->

                    <!-- Nav Short Image -->
                    <div class="card mt-5">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavShortImage" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('ShortImage')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavShortImage" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavShortImage">Short Image
                                            <span id="iconToggleShortImage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavShortImage" 
                                        class="collapse" 
                                        aria-labelledby="NavShortImage" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Image -->
                                            <div class="form-group">
                                                <label>Image</label>
                                                <img :src="row.short_preview" 
                                                    class="mb-2 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onShortImageChange">
                                            </div>
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.short_image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.short_image_title">
                                            </div>
                                            <!-- Image -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Short Image -->


                    <!-- Nav Status -->
                    <div class="card mt-5">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavStatus" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Status')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavStatus" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavStatus">Status & Visibility
                                            <span id="iconToggleStatus" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavStatus" 
                                        class="collapse" 
                                        aria-labelledby="NavStatus" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Status -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch1" 
                                                        :checked="row.status"
                                                        @click="onStatus">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch1"
                                                        v-html="(row.status) ? 'Active' : 'Inactive'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Status -->

                                            <!-- View In Home -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.view_in_home"
                                                        @click="onHome">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.view_in_home) 
                                                            ? 'View In Home' : 'Hide In Home'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End View In Home -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Status -->

                </div>
                <!-- ******* End SideNav ******** -->


                </div>
            </div>
            <!-- End Content -->


                <div class="col-md-12 row">
                    <div class="form-group mr-2">
                        <button class="btn btn-primary" :disabled="btnLoading">
                            <span v-if="btnLoading">
                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                    role="status" 
                                    aria-hidden="true">
                                </span>Loading...
                            </span>
                            <span v-if="!btnLoading" class="ti-check-box"></span>
                            <span v-if="!btnLoading"> Update Cruise</span>
                        </button>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-danger" 
                            :disabled="btnLoading" 
                            @click="cancel">
                            <span class="ti-close"></span>
                            <span> Cancel </span>
                        </button>
                    </div>
                </div>


            </form>
        </div>


                <Footer></Footer>
            </div>
        </main>
        <!-- End Main -->
        
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import Multiselect from 'vue-multiselect';
    import Editor from '@tinymce/tinymce-vue';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Footer,
            Editor,
            Multiselect
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    cruise_type_id: '',
                    status: 1,
                    view_in_home: 0,
                    
                    // image
                    preview: '',
                    image: '',
                    image_alt: '',
                    image_title: '',

                    // short image
                    short_preview: '',
                    short_image: '',
                    short_image_alt: '',
                    short_image_title: '',
                    
                    // rows
                    slug: '',
                    title: '',
                    body: '',

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    // prices
                    prices: [],
                    price_names: [],
                    price_items: [],
                    price_item_values: [],
                    price_item_body: [],

                    // itienraries
                    itineraries: [],
                    itinerarie_title: [],
                    itinerarie_order: [],
                    itinerarie_items: [],
                    itinerarie_item_title: [],
                    itinerarie_item_body: [],
                    itinerarie_item_order: [],
                },
                editor: {
                    api_key: 'xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b',
                    menubar: 'file edit view insert format tools table tc help',
                    plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                              alignleft aligncenter alignright alignjustify | \
                              bullist numlist outdent indent | removeformat | help',
                },
                types: [],
                typeLoading: true,

                cabinsValue: [],
                cabinsOptions: [],
                cabinLoading: true,

                prices_length: [],
                prices_items_length: [],

                itineraries_length: [],
                itineraries_items_length: [],

                pgLoading: true,
                btnLoading: false,
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            this.fetchRow();
        },
        methods: {
            
            // toggleCollapse
            collapseToggle(div) {
                let el = document.querySelector("span#iconToggle"+div);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
            },

            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/cruises/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    this.row.cruise_type_id = res.data.row.cruise_type_id;
                    this.row.status = res.data.row.status;
                    this.row.view_in_home = res.data.row.view_in_home;

                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.image_title : null;

                    this.row.short_preview = (res.data.row.short_image) ? res.data.row.short_image.image_url : null;
                    this.row.short_image_alt = (res.data.row.short_image ) ? res.data.row.short_image.image_alt : null;
                    this.row.short_image_title = (res.data.row.short_image ) ? res.data.row.short_image.age_title : null;
                        
                    this.row.slug = res.data.row.slug;
                    this.row.title = res.data.row.title;
                    this.row.body = res.data.row.body;

                this.row.meta_title = (res.data.row.meta) ? res.data.row.meta.meta_title : null;
                this.row.meta_keywords = (res.data.row.meta) ? res.data.row.meta.meta_keywords : null;
                this.row.meta_description = (res.data.row.meta) ? res.data.row.meta.meta_description : null;


                    this.prices_length = res.data.row.prices;
                    if(this.prices_length) {
                        for(let i = 1; i <= this.prices_length.length; i++) {
                            let x = i-1;
                            this.row.price_names[i] = res.data.row.prices[x].name;
                            // get items
                            this.prices_items_length[x] = res.data.row.prices[x].items.length;
                            for( let y = 1; y <= res.data.row.prices[x].items.length; y++) {
                                let z = y-1;
                                this.row.price_item_values[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].price_value;
                                this.row.price_item_body[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].body;
                            }
                        }
                    }


                    this.itineraries_length = res.data.row.itineraries;
                    if(this.itineraries_length) {
                        for(let i = 1; i <= this.itineraries_length.length; i++) {
                            let x = i-1;
                            this.row.itineraries_title[i] = res.data.row.itineraries[x].title;
                            // get items
                            this.itineraries_items_length[x] = res.data.row.itineraries[x].items.length;
                            for( let y = 1; y <= res.data.row.itineraries[x].items.length; y++) {
                                let z = y-1;
                                this.row.itineraries_item_title[i+'_'+y] 
                                        = res.data.row.itineraries[x].items[z].title;
                                this.row.itineraries_item_body[i+'_'+y] 
                                        = res.data.row.itineraries[x].items[z].body;
                                this.row.itineraries_item_order[i+'_'+y] 
                                        = res.data.row.itineraries[x].items[z].order;
                            }
                            //
                        }
                    }

                    this.fetchCruiseTypes();

                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Regions
            fetchCruiseTypes(){
                this.regionLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/cruiseTypes',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.typeLoading = false;
                        this.types = res.data.rows;
                        this.fetchCruiseCabins();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },


            fetchCruiseCabins() {
                this.cabinLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/cabins',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.cabinLoading = false;
                        this.cabinsOptions = res.data.rows.cabins;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image = file;
            },
            onShortImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image = file;
            },


            // editRow
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };

                // prices
                for( let i = 1; i < this.row.price_names.length; i++ ) {
                        for( let x = 1; x <= 10; x++) {
                        let item_value = this.row.price_item_values[i+'_'+x];
                        let item_body  = this.row.price_item_body[i+'_'+x];
                        if(item_value) {
                            this.row.price_items[x] = {
                                'item_value' : item_value,
                                'item_body'  : item_body
                            }
                        }
                    }
                    this.row.prices[i] = {
                        'price_name' : this.row.price_names[i],
                        'items'      : this.row.price_items
                    }
                    this.row.price_items = []; // clear array
                }

                // itienraries
                for( let i = 1; i < this.row.itinerarie_title.length; i++ ) {
                        for( let x = 1; x <= 10; x++) {
                        let item_title = this.row.itinerarie_item_title[i+'_'+x];
                        let item_body  = this.row.itinerarie_item_body[i+'_'+x];
                        let item_order = this.row.itinerarie_item_order[i+'_'+x];
                        if(item_title) {
                            this.row.itinerarie_items[x] = {
                                'title': item_title,
                                'body': item_body,
                                'order': item_order
                            }
                        }
                    }
                    this.row.itineraries[i] = {
                        'title': this.row.itinerarie_title[i],
                        'order': this.row.itinerarie_order[i],
                        'items': this.row.itinerarie_items
                    }
                    this.row.itinerarie_items = []; // clear array
                }


                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/cruises/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        cruise_type_id: this.row.cruise_type_id,
                        status: this.row.status,
                        view_in_home: this.row.view_in_home,

                        cabins: this.cabinsValue,

                        image_url: this.row.image,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        short_image_url: this.row.short_image,
                        short_image_alt: this.row.short_image_alt,
                        short_image_title: this.row.short_image_title,

                        title: this.row.title,
                        slug: this.row.slug,
                        body: this.row.body,
                        ///

                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description,

                        prices: this.row.prices,
                        itineraries: this.row.itineraries
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: 'cruises' })
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 403) {
                            this.removeLocalStorage()
                            this.$router.push({ name: 'forbidden' })
                        } else {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: err.response.data.message
                            });
                        }
                    })
                    .finally(() => {})
            },


            // items add more
            opnFrm(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeOption(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.price_names[i] = '';
            },
            opnSub(i,x) {
                let prev = x - 1;
                let pvt = document.querySelector('#subBtn_'+i+'_'+prev);
                let frm = document.querySelector('#sub_'+i+'_'+x);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeSubOption(i,x) {
                let prev = x - 1;
                let pvt = document.querySelector('#subBtn_'+i+'_'+prev);
                let frm = document.querySelector('#sub_'+i+'_'+x);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.price_item_values[i+'_'+x] = '';
                this.row.price_item_body[i+'_'+x] = '';
            },

            // item2 add more
            opnFrm2(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn2_'+prev);
                let frm = document.querySelector('#frm2_'+i);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeOption2(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn2_'+prev);
                let frm = document.querySelector('#frm2_'+i);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.price_names[i] = '';
            },
            opnSub2(i,x) {
                let prev = x - 1;
                let pvt = document.querySelector('#subBtn2_'+i+'_'+prev);
                let frm = document.querySelector('#sub2_'+i+'_'+x);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeSubOption2(i,x) {
                let prev = x - 1;
                let pvt = document.querySelector('#subBtn2_'+i+'_'+prev);
                let frm = document.querySelector('#sub2_'+i+'_'+x);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.price_item_values[i+'_'+x] = '';
                this.row.price_item_body[i+'_'+x] = '';
            },

            // Title
            onTitleChange() {
                this.onSlugChange(this.row.title);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str=''){
                if(!str) {
                    str = this.row.slug;
                }
                this.row.slug = str.replace(/\s+/g, '-');
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
            onHome(){
                if(this.row.view_in_home)
                    this.row.view_in_home = 0;
                else
                    this.row.view_in_home = 1;
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'cruises' });
                }
            },

        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
